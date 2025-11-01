import { useState } from "react"
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore"

export const useCart = () => {
  const [productosAgregados, setProductosAgregados] = useState([])
  const db = getFirestore()

  const addItem = async (producto, quantity) => {
    if (!producto?.id || quantity <= 0)
      return { ok: false, error: "Cantidad inválida" }

    try {
      const ref = doc(db, "items", producto.id)
      const snap = await getDoc(ref)

      if (!snap.exists()) return { ok: false, error: "Producto no existe" }

      const stockActual = Number(snap.data().stock ?? 0)
      if (quantity > stockActual)
        return { ok: false, error: `Stock disponible: ${stockActual}` }

      const existe = productosAgregados.find(p => p.id === producto.id)
      if (!existe) {
        setProductosAgregados(prev => [...prev, { ...producto, quantity }])
      } else {
        setProductosAgregados(prev =>
          prev.map(p =>
            p.id === producto.id ? { ...p, quantity: p.quantity + quantity } : p
          )
        )
      }

      await updateDoc(ref, { stock: stockActual - quantity })
      return { ok: true }
    } catch (e) {
      console.error(e)
      return { ok: false, error: "Error al actualizar stock" }
    }
  }

  const decreaseItem = async (producto, quantity = 1) => {
    if (!producto?.id || quantity <= 0) return

    try {
      const ref = doc(db, "items", producto.id)
      const snap = await getDoc(ref)
      const stockActual = Number(snap.data().stock ?? 0)

      setProductosAgregados(prev =>
        prev
          .map(p =>
            p.id === producto.id
              ? { ...p, quantity: p.quantity - quantity }
              : p
          )
          .filter(p => p.quantity > 0)
      )

      await updateDoc(ref, { stock: stockActual + quantity })
    } catch (e) {
      console.error("Error al devolver stock:", e)
    }
  }

  const deleteItem = async id => {
    const prod = productosAgregados.find(p => p.id === id)
    setProductosAgregados(prev => prev.filter(p => p.id !== id))
    if (!prod) return

    try {
      const ref = doc(db, "items", id)
      const snap = await getDoc(ref)
      const stockActual = Number(snap.data().stock ?? 0)
      await updateDoc(ref, { stock: stockActual + prod.quantity })
    } catch (e) {
      console.error("Error al devolver stock:", e)
    }
  }

  const clear = async () => {
    try {
      for (const p of productosAgregados) {
        const ref = doc(db, "items", p.id)
        const snap = await getDoc(ref)
        const stockActual = Number(snap.data().stock ?? 0)
        await updateDoc(ref, { stock: stockActual + p.quantity })
      }
    } catch (e) {
      console.error("Error al restaurar stock:", e)
    } finally {
      setProductosAgregados([])
    }
  }

  return { productosAgregados, addItem, decreaseItem, deleteItem, clear }
}
