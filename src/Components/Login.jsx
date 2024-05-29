import { useEffect, useState } from "react"
import Dashboard from "./Dashboard"
import { desconectar, signlogin } from "./db/FireBaseConf"

const Login = () => {
    const [Activo, SetActivo] = localStorage.getItem('activo') === 'true' ? useState(true) : useState(false)

    //correo y contraseña
    const [Email, Setemail] = useState('')
    const [Password, SetPassword] = useState('')
    const [Passerror, Setpasserror] = useState(true)

    useEffect(() => {
        if (Passerror == false){
            setTimeout(handlepasserror,5000)
        }
    },[Passerror])

    const handlepasserror = () => {
        Setpasserror(true)
    }

    //establecer conexion firebase
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            //iniciar sesion firebase
            await signlogin(Email,Password)
            SetActivo(true)
        } catch (error) {
            Setpasserror(false)
        }
    }

    const handleOut = async () => {
        try{
            await desconectar()
            SetActivo(false)
            window.location.reload()
        }catch (error){
            console.error('Error en desconectar: ', error)
        }
    }
    
    return (
        <>
        <div className="bg-red-950 m-0 h-24">
            <div className="flex justify-between items-center mx-auto">
                <img src="src/img/Logo.png" alt="Logo" className ="-mt-12 w-48 h-48 animate-fade"></img>
                {Activo ? ( <img src="src/img/salida.png" alt="salida" className ="-mt-12 mr-3 w-14 h-14" onClick={handleOut}></img>) : false}
            </div>
        </div>
            {Activo ? (
                <Dashboard></Dashboard>
            ):(
                <div className="bg-[url('./img/Fondo.jpg')] flex flex-col h-screen">
                    <div className="w-full max-w-xs mt-auto mb-auto mr-auto ml-auto">
                        <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" form="username">
                                    Correo
                                </label>
                                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" placeholder="Email" value={Email} onChange={e=>Setemail(e.target.value)}/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" form="password">
                                    Contraseña
                                </label>
                                {Passerror ? <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="**************" value={Password} onChange={e=>SetPassword(e.target.value)}/> : <input type="password" id="password" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="**************" value={Password} onChange={e=>SetPassword(e.target.value)}/>}
                                {Passerror ? false : <p className="text-red-500 text-xs italic">Escriba la contraseña correcta</p>}
                            </div>
                            <div className="text-center items-center">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Iniciar sesion
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
        </>
    )
}

export default Login