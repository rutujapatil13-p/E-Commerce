import Link from 'next/link';
import { useStore } from '../store/useStore';
import styles from '../styles/cart.module.css';

export default function Cart() {
    const { cart, removeFromCart, clearCart } = useStore();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Your Cart</h1>
                <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Continue Shopping
                </Link>
            </header>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (  
                <>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mb-2" />
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    <p className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Remove
                                    </p>

                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        <button
                            onClick={clearCart}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            <p className="bg-blue-500 text-white px-4 py-2 rounded">
                                Clear Cart
                            </p>

                        </button>
                    </div>
                </>
            )}
        </div>
    );
}