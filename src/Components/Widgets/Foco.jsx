import { useEffect, useState } from "react"
import botton_off from '../../img/boton_off.png'
import botton_on from '../../img/botton_on.png'
import { activacion_foco } from "../db/FireBaseConf"


const Foco = ( { foco, llama, CO, ID } ) => {
    const [Activo, Setactivo] = useState("")
    const [Botton, Setbotton] = useState(false)
    const [Est_Foco, SetEst_Foco] = useState(false)

    useEffect(() => {
        if(Activo == "on"){
            Setbotton(true)
        }else{
            Setbotton(false)
        }
    },[Activo])

    useEffect(() => {
        if(Activo == "on"){
            SetEst_Foco(true)
        }else{
            SetEst_Foco(false)
        }
    },[Activo])

    useEffect(() => {
        if(foco == 1){
            SetEst_Foco(true)
        }else{
            SetEst_Foco(false)
        }
    },[foco])

    const handle_est_boton_on = () =>{
        Setactivo("on")
        activacion_foco(llama,CO,1,ID)
    }

    const handle_est_boton_off = () =>{
        Setactivo("off")
        activacion_foco(llama,CO,0,ID)
    }

    return (
        <>
        { Est_Foco ?  (
            <img src={botton_on} alt="boton on" width="300px" height="300px" onClick={handle_est_boton_off}/>
        ):(
            <img src={botton_off} alt="boton off" width="300px" height="300px" onClick={handle_est_boton_on}/>
        )}
        </>
    )
}

export default Foco