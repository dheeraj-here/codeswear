import React from 'react';
import { useNavbar } from '@/context/NavbarContext';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import LoadingBar from 'react-top-loading-bar';

const Checkout = () => {
  const { cart, addToCart, removeFromCart, clearTheCart, subTotal } = useNavbar();
  // console.log(cart, addToCart, removeFromCart, clearTheCart, subTotal);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [disabled, setDisabled] = useState(true);



  const handleChange = async (e) => {


    if (e.target.name == 'name') setName(e.target.value)
    else if (e.target.name == 'email') setEmail(e.target.value)
    else if (e.target.name == 'address') setAddress(e.target.value)
    else if (e.target.name == 'phone') setPhone(e.target.value)
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value)
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.HOST}/api/pincode`)
        let pinJson = await pins.json();
        if (Object.keys(pinJson).includes(e.target.value)) {
          console.log(pinJson[e.target.value][0]);
          const dataPin = pinJson[e.target.value];
          console.log("dataPin", dataPin[0]);
          setState(dataPin[1])
          setCity(dataPin[0])
        }
      }
      else{
        setState('');
        setCity('');
      }
    }
  
    if (name && email.length>6 && address && phone.length >= 10 && pincode.length == 6 && state && city) {
      console.log("Disabled called False", disabled);
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }

  const onScriptLoad = async () => {
    let amount;
    let oid = Math.floor(Math.random() * Date.now())
    // Get txtToken

    const data = { cart, subTotal, oid };
    let a = await fetch(`${process.env.HOST}api/preTransaction`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    let txnRes = await a.json();
    console.log(b);
    let txnToken = txnRes.txnToken;
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": oid, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };
    window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
    }).catch(function onError(error) {
      console.log("error => ", error);
    });
  }


  return (
    <div className='wrap m-4'>
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" /></Head>
      <Script type="application/javascript" src="{HOST}/merchantpgpui/checkoutjs/merchants/{MID}.js" onload="onScriptLoad();" crossorigin="anonymous"></Script>

      <div className="top text-xl md:text-2xl font-bold flex justify-center py-6">Checkout</div>
      <div className="form">
        <div className="f p-2 font-bold lg:w-2/3 flex mx-auto">1. Delivery Details</div>
        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-2 space-y-4 sm:px-0 items-end">
          <div className=" flex-grow w-full">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} type="text" id="full-name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative flex-grow w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="flex my-6 lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
          <div className="relative flex-grow w-full">
            <label htmlFor="textarea" className="leading-7 text-sm text-gray-600">Address</label>
            <textarea onChange={handleChange} id="textarea" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-2 space-y-4 sm:px-0 items-end">
          <div className=" flex-grow w-full">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} type="text" id="phone" name="phone" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative flex-grow w-full">
            <label className="leading-7 text-sm text-gray-600">Pincode</label>
            <input onChange={handleChange} type="text" id="pincode" name="pincode" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className="flex my-6 lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-2 space-y-4 sm:px-0 items-end">
          <div className=" flex-grow w-full">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} readOnly value={state} type="text" id="state" name="state" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative flex-grow w-full">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">City</label>
            <input onChange={handleChange} readOnly value={city} type="text" id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>

        <div className="secons my-4">
          <div className="f p-2 font-bold lg:w-2/3 flex mx-auto">2. Review Cart Items & Pay</div>
          <div className="box px-4">
            <ul className="list my-6 text-base space-y-3">
              {Object.keys(cart) == 0 &&
                <div className="my-4 text-xl font-semibold flex justify-center ">Cart is empty!</div>
              }
              {Object.keys(cart).map((k) => (<div key={k} className="item flex justify-between font-base">
                <div className="w-1/2 flex"><div className='pr-2'></div>1. {cart[k].name} </div>
                <div className="w-1/2 flex justify-center text-xl"><AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='pr-1 mt-1  text-pink-600' /> {cart[k].qty} <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='pl-1 mt-1 text-pink-600 cursor-pointer' /></div>
              </div>)
              )}

            </ul>

          </div>
          {Object.keys(cart) != 0 &&
            <>
              <div className="total font-semibold mx-7 mb-1">₹ {subTotal}</div>
              <div className="">
                <Link legacyBehavior href="/order">
                  <a>
                    <button
                      disabled={disabled}
                      onClick={onScriptLoad}
                      className="disabled:bg-pink-300 w-9 mx-7 text-white px-1.5 bg-pink-500 border-0 py-1 focus:outline-none hover:bg-pink-600 rounded text-md"
                    >
                      Pay
                    </button>
                  </a>
                </Link>
              </div>
            </>
          }
        </div>
      </div>
    </div >
  );
}
export default Checkout;
