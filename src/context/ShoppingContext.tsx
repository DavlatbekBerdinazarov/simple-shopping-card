import { useContext, ReactNode, createContext, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

type CartItem = {
  id: number
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(c => c.id === id)?.quantity || 0
    // agar bizda qiymat bolsa quantity bolsin bolmasa 0 qaytsin
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(c => c.id === id) == null) {
        return [...currItems, {id, quantity: 1}]
      }else {
        return currItems.map(c => {
          if (c.id === id) {
            return { ...c, quantity: c.quantity + 1 }
          } else {
            return c
          }
        })
      }
    })
  }


  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(c => c.id === id)?.quantity === 1) {
        return currItems.filter(c => c.id !== id)
      }else {
        return currItems.map(c => {
          if (c.id === id) {
            return { ...c, quantity: c.quantity - 1 }
          } else {
            return c
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(c => c.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider 
    value={{
      getItemQuantity, 
      increaseCartQuantity, 
      decreaseCartQuantity, 
      removeFromCart,
      openCart,
      closeCart,
      cartItems,
      cartQuantity
      }}>
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}

