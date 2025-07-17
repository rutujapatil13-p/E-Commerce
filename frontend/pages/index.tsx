import { useState } from 'react';
import { useStore } from '../store/useStore';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const products = [
    { id: 1, name: 'T-Shirt', price: 19.99, image: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/19436374a.webp' },
    { id: 2, name: 'Jeans', price: 49.99, image: 'https://cdn.fcglcdn.com/brainbees/images/products/583x720/20064221a.webp' },
    { id: 3, name: 'Sneakers', price: 79.99, image: 'https://tse3.mm.bing.net/th/id/OIP.L2bYMQdow0YyuNbtQ7f4ZQHaJ4?pid=Api&P=0&h=180'},
    { id: 4,name: 'Toy', price: 19.99, image: 'https://m.media-amazon.com/images/I/51myMJ3aZdL._SX300_SY300_QL70_ML2_.jpg' },
    { id: 5,name: 'Watch', price: 199.99, image: 'https://pngimg.com/uploads/watches/watches_PNG101450.png' },
    { id: 6,name: 'Bag', price: 39.99, image: 'https://tse2.mm.bing.net/th/id/OIP.UN8PVK6l0Q_UDDfS4_XZWAHaI4?pid=Api&P=0&h=180' },
];

export default function Home() {
    const addToCart = useStore((state) => state.addToCart);

    return (
        <div className="container mx-auto p-4">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">E-Commerce</h1>
                <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded">
                    View Cart
                </Link>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded">
                         <img src={product.image} alt={product.name} className="w-50 h-50 object-cover mb-5"></img>
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                        <button
                            onClick={() => addToCart(product)}
                            className="mt-2 bg-white-500 text-black px-4 py-2 rounded w-full"
                        >
                            <Link href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded align-center">
                                Add to Cart
                            </Link>

                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}