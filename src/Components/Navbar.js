import React, { useRef } from 'react';
import '../app/globals.css'
import { useState } from 'react';
import Link from 'next/link';
import { useNavbar } from '@/context/NavbarContext';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { MdAccountCircle } from 'react-icons/md'

const Navbar = () => {
    const { cart, addToCart, removeFromCart, clearTheCart, subTotal, user, logout } = useNavbar();
    console.log(user);
    const [dropDown, setDropDown] = useState(false)

    const drop = () => {
        setDropDown(!dropDown)
    }

    const toggleCart = () => {
        console.log("Cart clicked");
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.remove('hidden')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
            ref.current.classList.add('hidden')
        }
    }

    const ref = useRef()
    return (
        <div className='navbar text-white py-1 flex bg-pink-400 flex-col md:flex-row justify-center items-center md:justify-start md:py-3'>
            <div className="logo mx-4 mb-1">
                <Link href={'/'}>Logo Image</Link>
            </div>

            <div className="navs">
                <ul className="list flex space-x-2 sm:space-x-4 md:space-x-6">
                    <Link href={'/tShirts'}>tShirts</Link>
                    <Link href={'/hoodies'}>Hoodies</Link>
                    <Link href={'/mugs'}>Mugs</Link>
                    <Link href={'/stickers'}>Stickers</Link>
                </ul>
            </div>


            <div className="card flex space-x-1 absolute right-0 top-2 mx-3">

                {user.value == null && <Link href={'/login'} className='bg-pink-500 px-2 rounded-md mx-1 hover:bg-pink-600'>Login</Link>}

                <div onMouseEnter={drop} onMouseLeave={drop}>
                    {user.value != null && <div className=''><MdAccountCircle className='text-xl md:text-2xl' /></div>}
                    {dropDown && <div className="account absolute right-8 w-40 justify-center top-5 bg-slate-500 flex">
                        <ul>
                            <Link href={'/'}><div className=''>My Account</div></Link>
                            <Link href={'/order'}><div className="">Orders</div></Link>
                            <button onClick={logout} className="">Logout</button>
                        </ul>
                    </div>}
                </div>
                <button onClick={toggleCart} className=""><AiOutlineShoppingCart className='text-xl md:text-2xl' /></button>
            </div>

            <div ref={ref} className="h-[100vh] text-black sideCart absolute right-0 top-2 rounded-md bg-pink-300 w-60 p-8 transform transition-transform translate-x-full hidden z-10">
                <div className="head flex mx-auto justify-between">
                    <div className="cart font-bold text-xl flex mx-auto justify-between">Shopping Cart</div>
                </div>
                <button onClick={toggleCart} className="handle w-6 h-6 absolute top-2 right-3"> <AiFillCloseCircle className='' /> </button>

                <ul className="list my-6 text-base space-y-3">
                    {Object.keys(cart) == 0 &&
                        <div className="my-4 text-xl font-semibold flex justify-center ">Cart is empty!</div>
                    }
                    {Object.keys(cart).map((k) => (<div key={k} className="item flex justify-between font-semibold">
                        <div className="w-2/3 flex"><div className='pr-2'></div>1. {cart[k].name} </div>
                        <div className="w-1/3 flex justify-center text-xl"><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='pr-1 mt-1  text-pink-600' /> {cart[k].qty} <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='pl-1 mt-1 text-pink-600 cursor-pointer' /></div>
                    </div>)
                    )}

                </ul>
                {Object.keys(cart).length > 0 &&
                    <>
                        <div className="total">{subTotal}</div>

                        <div className=" flex space-x-2.5 w-full">
                            <Link href={'/checkout'}><button className="flex mx-auto text-white bg-pink-500 border-0 py-1 px-1 focus:outline-none hover:bg-pink-600 rounded text-md">Checkout </button></Link>
                            <button onClick={clearTheCart} className="flex mx-auto text-white px-1.5 bg-pink-500 border-0 py-1  focus:outline-none hover:bg-pink-600 rounded text-md">Clear cart</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}


export default Navbar;
