"use client"
import React, { useState, useRef } from "react";
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { register } from "@/services/loginService";

export default function Unauthorized() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const router = useRouter();
    const toast = useRef<Toast>(null);

    const showMessage = (message:string, type: string)=>{
        console.log(type);
        if(toast.current !== null){
            if(type === 'error'){
                toast.current.show({severity:'error', summary: 'Error', detail:message, life: 3000});
            }
            else{
                toast.current.show({severity:'success', summary: 'Info', detail:message, life: 3000});
            }
        }
    }

    const onHandleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setServerMessage('');
        try {
            let status: any = await register({ email, userName, password, password2 });
            if(status.error !== 'OK'){
                setLoading(false);
                setServerMessage(status.message);
                showMessage(status.message, 'error');
            }
            else{
                setLoading(false);
                showMessage(status.message, 'success');
                setEmail('');
                setUserName('');
                setPassword('');
                setPassword2('');
            }
        }
        catch (e) {
            setLoading(false);
            await setServerMessage('Ocurrio un error. Intente de nuevo.');
            showMessage(serverMessage, 'error');
        } 
    }

    const onBackLogin = () => {
        router.push('/');
    }

    const onHandleChange = (e: any) => {
        const { name, value } = e.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "userName":
                setUserName(value);
                break;
        }
    }

    const onHandleChangePwd = (e: any) => {
        const { name, value } = e.target;
        switch (name) {
            case "password":
                setPassword(value);
                break;
            case "password2":
                setPassword2(value);
                if(password !== value){
                    setPassword2Error('The passwords should be the same');
                }
                else{
                    setPassword2Error('');
                }
                break;
        }

        
    }

    return (
        <>
        {
            (loading)?
            <div className="absolute w-full top-0 bottom-0 flex justify-content-center bg-slate-50/20">
                <ProgressSpinner 
                    style={{width: '50px', height: '50px', top: '40%'}} 
                    strokeWidth="8" 
                    fill="var(--surface-ground)" 
                    animationDuration=".5s" 
                />
            </div>
            : ''
        }
        <div className="card flex justify-content-center">
            <Toast ref={toast} />
        </div>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">
                    <Image
                        src='/logo_projector.png'
                        alt='Logo projector'
                        width={100}
                        height={100}
                        className="invert"
                    />
                </div>
                <h1 className="text-center text-5xl font-bold leading-9 tracking-tight text-white-900">
                    Projector
                </h1>
                <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-white-900">
                    Crea tu Cuenta
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form 
                    className="space-y-6" 
                    autoComplete="off"
                    onSubmit={onHandleSubmit}
                >
                    <div>
                        <div className="mt-2">
                            <InputText 
                                onChange={onHandleChange}
                                value={userName}
                                type="text"
                                id="userName"
                                name="userName"
                                placeholder="Nombre de Usuario"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <InputText 
                                onChange={onHandleChange}
                                value={email}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email de Usuario"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {
                                (emailError !== '')?
                                <small id="email-error" className="text-red-300 text-sm block">Email is not available.</small>
                                : ''
                            }
                        </div>
                    </div>
                    <div>
                        <div className="mt-2">
                            <InputText 
                                onChange={onHandleChangePwd}
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
                        <div className="mt-2">
                            <InputText 
                                onChange={onHandleChangePwd}
                                value={password2}
                                type="password"
                                id="password2"
                                name="password2"
                                placeholder="Repetir Contraseña"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {
                                (password2Error !== '')?
                                <small id="password2-error" className="text-red-300 text-sm block">{password2Error}</small>
                                : ''
                            }
                        </div>
                    </div>

                    <div 
                        className="flex justify-between"
                    >
                    <button 
                        type="button" 
                        className="w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onBackLogin}
                        >
                        Volver a Login
                    </button>
                    <button 
                        type="submit" 
                        className="w-1/3 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Create account
                    </button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}