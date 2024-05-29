import { useEffect, useState } from "react";
import { db } from "./db/FireBaseConf.js";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Sensor_llama from "./Widgets/Sensor_llama.jsx";
import Mq_7 from "./Widgets/Mq_7";
import Foco from "./Widgets/Foco.jsx";
import Sensor_llama_graf from "./Widgets/graficas/Sensor_llama_graf.jsx";
import Mq_7_graf from "./Widgets/graficas/Mq_7_graf.jsx";

const Dashboard = () => {
    const [Alertas, Setalertas] = useState([])
    const [llamaValue, setLlamaValue] = useState(null) // Estado para almacenar el valor de llama
    const [mq_7, Setmq_7] = useState(null)
    const [Foco_value, Setfoco_value] = useState(null)
    const [ID, setID] = useState(null)

    useEffect(() => {
        const alertaicendiosCollection = collection(db, "AlertaIcendios");
        const orderedQuery = query(alertaicendiosCollection, orderBy("id", "asc"));

        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
            const alertaicendiosList = snapshot.docs.map((doc) => ({
                id: doc.id,
                llama: doc.data().llama,
                co: doc.data().CO,
                foco: doc.data().FOCO
            }));

            Setalertas(alertaicendiosList);
            
            // Actualizar el valor de llama cuando cambie
            if (alertaicendiosList.length > 0) {
                const lastItemIndex = alertaicendiosList.length - 1
                setLlamaValue(alertaicendiosList[lastItemIndex].llama)
                Setmq_7(alertaicendiosList[lastItemIndex].co)
                Setfoco_value(alertaicendiosList[lastItemIndex].foco)
                setID(alertaicendiosList[lastItemIndex].id)
            } else {
                setLlamaValue(0)
                Setmq_7(0)
                Setfoco_value(0)
                setID(null)
            }
        });

        return () => unsubscribe();
    }, []);
    console.log(Foco_value)
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 mt-3 mb-3">
                <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 custom-size">
                    <p className="font-bold italic">Sensor de llama</p>
                    <Sensor_llama llama={llamaValue} />
                </div>
                <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 custom-size">
                    <p className="font-bold italic">MQ-7</p>
                    <Mq_7
                        CO = {mq_7} 
                    />
                </div>
                <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 custom-size">
                    <p className="font-bold italic">Foco</p>
                    <Foco 
                        foco = {Foco_value}
                        llama = {llamaValue}
                        CO = {mq_7}
                        ID = {ID}
                    />
                </div>
                <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 custom-size">
                    <p className="font-bold italic">Gráfica del sensor de llama</p>
                    <Sensor_llama_graf />
                </div>
                <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 custom-size">
                    <p className="font-bold italic">Gráfica del sensor MQ-7</p>
                    <Mq_7_graf />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
