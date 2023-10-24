"use client"
import React from "react";
import { useEffect, useState, useRef } from 'react';
import loggon from '@/services/loginService';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { GlobalContextProvider, useGlobalContext } from "@/components/context/appContext";

export default function Home() {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState('off');
  const [error, setError] = useState('');
  const [dialogResetPassProps, setDialogResetPassProps] = useState({
    open: false,
    token: ''
  });
  const {appData, setAppdata} = useGlobalContext();
  const toast = useRef<Toast>(null);

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const showError = (error_toast:string)=>{
    if(toast.current !== null){
      toast.current.show({severity:'error', summary: 'Error', detail:error_toast, life: 3000});
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setError('');
    setLogged('pending');
    try {
      let auth: any = await loggon({ email, password });
      let user = {
        username: auth.user,
        email: auth.email,
        userType: auth.user_type,
        avatar: auth.avatar
      };

      if (auth.error !== 'OK') {
        //Errores
        console.log(auth);
        setError(auth.error);
        showError(auth.error);
      } 
      else{
        setAppdata(user);
        route.push('/admin');
      }
    }
    catch (e) {
      setError('Ocurrio un error. Intente de nuevo.');
    } 
    finally {
      setLogged('off');
    }
  };


  return (
    <>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form 
            className="space-y-6" 
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mt-2">
                <InputText 
                  onChange={handleOnChange}
                  value={email}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email de Usuario"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <InputText 
                  onChange={handleOnChange}
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-semibold text-white hover:text-indigo-300">Forgot password?</a>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <a href="#" className="font-semibold leading-6 text-white hover:text-indigo-300">Start a 14 day free trial</a>
          </p>
        </div>
      </div>
    </>
  );
}