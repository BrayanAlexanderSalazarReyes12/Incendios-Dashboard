// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASURE_MENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db}

//conexion mosquitto
const token = process.env.FIREBASE_TOKEN;

//obtener autenticacion

const auth = getAuth()

//funcion para obtener autenticacion

export function signlogin(email,password) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        //inicio existoso
        try {
            const reponse = await fetch(process.env.NODE_CONEXION_PERFIL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token})
            });
            
            if (reponse.ok) {
                console.log("usuario inicio sesion");
            }else{
                console.log("fallo de autenticacion");
            }
            
        } catch (error) {
            console.log("error");
        }
        const user = userCredential.user;
        localStorage.setItem('activo',true);
        return user;
    })

    .catch((error) => {
        //ocurrio un error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error al iniciar sesion: ", errorMessage);
        throw new Error(errorMessage);
    });
}

export function desconectar() {
    auth.signOut()
    .then(() => {
        console.log("usuario desconectado");
        localStorage.setItem('activo',false);
    })
    .catch(error => {
        console.error("Error al desconectar el usuario: ", error)
    });
}

export async function activacion_foco(Llama, CO, Foco, id){
    //const opciones = JSON.stringify({ llama: parseFloat(Llama), CO: parseFloat(CO), Foco: parseInt(Foco) });
    const datos = {
        llama: parseFloat(Llama),
        CO: parseFloat(CO),
        FOCO: Foco,
        ID: parseInt(id++)
    };
    console.log(Llama);
    console.log(CO);

    try {
        const reponse = await fetch(process.env.NODE_CONEXION_MOSQUITTO,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({...datos})
        });
        
        if (reponse.ok) {
            console.log("publico datos");
        }else{
            console.log("fallo en publicar datos");
        }
        
    } catch (error) {
        console.log("error:",error);
    }
}