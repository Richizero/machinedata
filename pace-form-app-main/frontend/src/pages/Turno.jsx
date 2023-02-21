import instance from "../utils/fetch"
import React, { useRef } from "react"
import Spinner from '../components/Spinner'
import './Turno.css'


function Turno({ date, turno, machine, setFecha, turn, isLoaded }) {
    const ref = useRef('null')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = { date: date }

        for (const eElement of e.target) {
            if (eElement.value) data[eElement.name] = eElement.value
        }

        await instance.machine.update(data, machine.id)

        if (index + 1 === 1) {
            setFecha({ turnos: [data, turno.turnos?.[1], turno.turnos?.[2]] })
        } else if (index + 1 === 2) {
            setFecha({ turnos: [turno.turnos?.[0], data, turno.turnos?.[2]] })
        } else if (index + 1 === 3) {
            setFecha({ turnos: [turno.turnos[0], turno.turnos[1], data] })
        }
    }

    const turnos = {
        'turno1': 0,
        'turno2': 1,
        'turno3': 2,
    }

    const index = turnos[turn]

    return (
        <>
            <form className='turn-form' ref={ref} onSubmit={handleSubmit}>

                <div className='center btn-sticky'>
                    <button className='buttonNew'>Save Information</button>
                </div>

                {isLoaded ?
                    <section id='formSection'>
                        <input name='turn' type='hidden' value={index + 1} disabled />
                        <h2>Position</h2>
                        <div className='title-machine'>Slow Point 1</div>
                        <input name='position_slowPoint1' type='number' value={turno.turnos?.[index]?.position_slowPoint1} disabled={turno.turnos?.[index]?.position_slowPoint1} inputMode='numeric' />
                        <div className='title-machine'>Intermediate Point 2</div>
                        <input name='position_intermediatePoint2' type='number' value={turno.turnos?.[index]?.position_intermediatePoint2} disabled={turno.turnos?.[index]?.position_intermediatePoint2} inputMode='numeric' />
                        <div className='title-machine'>Point 3</div>
                        <input name='position_point3' type='number' value={turno.turnos?.[index]?.position_point3} disabled={turno.turnos?.[index]?.position_point3} inputMode='numeric' />
                        <div className='title-machine'>Point 4</div>
                        <input name='position_point4' type='number' value={turno.turnos?.[index]?.position_point4} disabled={turno.turnos?.[index]?.position_point4} inputMode='numeric' />
                        <div className='title-machine'>Fast</div>
                        <input name='position_fast' type='number' value={turno.turnos?.[index]?.position_fast} disabled={turno.turnos?.[index]?.position_fast} inputMode='numeric' />
                        <div className='title-machine'>Decel</div>
                        <input name='position_decel' type='number' value={turno.turnos?.[index]?.position_decel} disabled={turno.turnos?.[index]?.position_decel} inputMode='numeric' />
                        <div className='title-machine'>Intensifier Pos</div>
                        <input name='position_intensifierPos' type='number' value={turno.turnos?.[index]?.position_intensifierPos} disabled={turno.turnos?.[index]?.position_intensifierPos} inputMode='numeric' />
                        <h2>Valve Set</h2>
                        <div className='title-machine'>Slow Valve 1</div>
                        <input name='valveSet_slowValve1' type='number' value={turno.turnos?.[index]?.valveSet_slowValve1} disabled={turno.turnos?.[index]?.valveSet_slowValve1} inputMode='numeric' />
                        <div className='title-machine'>Intermediate Valve 2</div>
                        <input name='valveSet_intermediateValve2' type='number' value={turno.turnos?.[index]?.valveSet_intermediateValve2} disabled={turno.turnos?.[index]?.valveSet_intermediateValve2} inputMode='numeric' />
                        <div className='title-machine'>Valve 3</div>
                        <input name='valveSet_valve3' type='number' value={turno.turnos?.[index]?.valveSet_valve3} disabled={turno.turnos?.[index]?.valveSet_valve3} inputMode='numeric' />
                        <div className='title-machine'>Valve 4</div>
                        <input name='valveSet_valve4' type='number' value={turno.turnos?.[index]?.valveSet_valve4} disabled={turno.turnos?.[index]?.valveSet_valve4} inputMode='numeric' />
                        <div className='title-machine'>Fast</div>
                        <input name='valveSet_fast' type='number' value={turno.turnos?.[index]?.valveSet_fast} disabled={turno.turnos?.[index]?.valveSet_fast} inputMode='numeric' />
                        <div className='title-machine'>Decel</div>
                        <input name='valveSet_decel' type='number' value={turno.turnos?.[index]?.valveSet_decel} disabled={turno.turnos?.[index]?.valveSet_decel} inputMode='numeric' />
                        <div className='title-machine'>Intens Speed</div>
                        <input name='valveSet_intensSpeed' type='number' value={turno.turnos?.[index]?.valveSet_intensSpeed} disabled={turno.turnos?.[index]?.valveSet_intensSpeed} inputMode='numeric' />
                        <h2>Outputs</h2>
                        <div className='title-machine'>Fully Fwd</div>
                        <input name='outputsShot_fullyFwd' type='number' value={turno.turnos?.[index]?.outputsShot_fullyFwd} disabled={turno.turnos?.[index]?.outputsShot_fullyFwd} inputMode='numeric' />
                        <div className='title-machine'>Vaccum Start</div>
                        <input name='outputsShot_vaccumStart' type='number' value={turno.turnos?.[index]?.outputsShot_vaccumStart} disabled={turno.turnos?.[index]?.outputsShot_vaccumStart} inputMode='numeric' />
                        <h2>Velocity</h2>
                        <div className='title-machine'>Slow</div>
                        <input name='velocity_slow' type='number' value={turno.turnos?.[index]?.velocity_slow} disabled={turno.turnos?.[index]?.velocity_slow} inputMode='numeric' />
                        <div className='title-machine'>Intermediate</div>
                        <input name='velocity_intermediate' type='number' value={turno.turnos?.[index]?.velocity_intermediate} disabled={turno.turnos?.[index]?.velocity_intermediate} inputMode='numeric' />
                        <div className='title-machine'>Fast</div>
                        <input name='velocity_fast' type='number' value={turno.turnos?.[index]?.velocity_fast} disabled={turno.turnos?.[index]?.velocity_fast} inputMode='numeric' />
                        <div className='title-machine'>Gate Vel</div>
                        <input name='velocity_gateVel' type='number' value={turno.turnos?.[index]?.velocity_gateVel} disabled={turno.turnos?.[index]?.velocity_gateVel} inputMode='numeric' />
                        <h2>Pressure</h2>
                        <div className='title-machine'>Shot Pressure</div>
                        <input name='pressure_shotPressure' type='number' value={turno.turnos?.[index]?.pressure_shotPressure} disabled={turno.turnos?.[index]?.pressure_shotPressure} inputMode='numeric' />
                        <div className='title-machine'>Decel Pressure</div>
                        <input name='pressure_decelPressure' type='number' value={turno.turnos?.[index]?.pressure_decelPressure} disabled={turno.turnos?.[index]?.pressure_decelPressure} inputMode='numeric' />
                        <div className='title-machine'>Intensifier Pressure</div>
                        <input name='pressure_intensifierPressure' type='number' value={turno.turnos?.[index]?.pressure_intensifierPressure} disabled={turno.turnos?.[index]?.pressure_intensifierPressure} inputMode='numeric' />
                        <div className='title-machine'>Final Pressure</div>
                        <input name='pressure_finalPressure' type='number' value={turno.turnos?.[index]?.pressure_finalPressure} disabled={turno.turnos?.[index]?.pressure_finalPressure} inputMode='numeric' />
                        <div className='title-machine'>Closing Pressure</div>
                        <input name='pressure_closingPressure' type='number' value={turno.turnos?.[index]?.pressure_closingPressure} disabled={turno.turnos?.[index]?.pressure_closingPressure} inputMode='numeric' />
                        <h2>Time</h2>
                        <div className='title-machine'>Cycle Time</div>
                        <input name='time_cycleTime' type='number' value={turno.turnos?.[index]?.time_cycleTime} disabled={turno.turnos?.[index]?.time_cycleTime} inputMode='numeric' />
                        <div className='title-machine'>Dwell Time</div>
                        <input name='time_dwellTime' type='number' value={turno.turnos?.[index]?.time_dwellTime} disabled={turno.turnos?.[index]?.time_dwellTime} inputMode='numeric' />
                        <div className='title-machine'>Rise Time</div>
                        <input name='time_riseTime' type='number' value={turno.turnos?.[index]?.time_riseTime} disabled={turno.turnos?.[index]?.time_riseTime} inputMode='numeric' />
                        <h2>Others</h2>
                        <div className='title-machine'>Ok For Dwell</div>
                        <input name='others_okForDwell' type='number' value={turno.turnos?.[index]?.others_okForDwell} disabled={turno.turnos?.[index]?.others_okForDwell} inputMode='numeric' />
                        <div className='title-machine'>Biscuit Length</div>
                        <input name='others_biscuitLength' type='number' value={turno.turnos?.[index]?.others_biscuitLength} disabled={turno.turnos?.[index]?.others_biscuitLength} inputMode='numeric' />
                        <div className='title-machine'>Diameter Tip</div>
                        <input name='others_diameterTip' type='number' value={turno.turnos?.[index]?.others_diameterTip} disabled={turno.turnos?.[index]?.others_diameterTip} inputMode='numeric' />
                        <div className='title-machine'>Lube Ratio And Type</div>
                        <input name='others_lubeRatioAndType' type='number' value={turno.turnos?.[index]?.others_lubeRatioAndType} disabled={turno.turnos?.[index]?.others_lubeRatioAndType} inputMode='numeric' />
                        <div className='title-machine'>Cover Half Temp</div>
                        <input name='others_coverHalfTemp' type='number' value={turno.turnos?.[index]?.others_coverHalfTemp} disabled={turno.turnos?.[index]?.others_coverHalfTemp} inputMode='numeric' />
                        <div className='title-machine'>Ejector Half Temp</div>
                        <input name='others_ejectorHalfTemp' type='number' value={turno.turnos?.[index]?.others_ejectorHalfTemp} disabled={turno.turnos?.[index]?.others_ejectorHalfTemp} inputMode='numeric' />
                        <div className='title-machine'>Plunger Flow</div>
                        <input name='others_plungerFlow' type='number' value={turno.turnos?.[index]?.others_plungerFlow} disabled={turno.turnos?.[index]?.others_plungerFlow} inputMode='numeric' />
                        <div className='title-machine'>Powder Quantity</div>
                        <input name='others_powderQuantity' type='number' value={turno.turnos?.[index]?.others_powderQuantity} disabled={turno.turnos?.[index]?.others_powderQuantity} inputMode='numeric' />
                        <div className='title-machine'>Oil Quantity</div>
                        <input name='others_oilQuantity' type='number' value={turno.turnos?.[index]?.others_oilQuantity} disabled={turno.turnos?.[index]?.others_oilQuantity} inputMode='numeric' />
                        <h2>Furnace</h2>
                        <div className='title-machine'>Metal Temp</div>
                        <input name='furnace_metalTemp' type='number' value={turno.turnos?.[index]?.furnace_metalTemp} disabled={turno.turnos?.[index]?.furnace_metalTemp} inputMode='numeric' />
                        <div className='title-machine'>Dosing Vol</div>
                        <input name='furnace_dosingVol' type='number' value={turno.turnos?.[index]?.furnace_dosingVol} disabled={turno.turnos?.[index]?.furnace_dosingVol} inputMode='numeric' />
                        <div className='title-machine'>Time Lag</div>
                        <input name='furnace_timeLag' type='number' value={turno.turnos?.[index]?.furnace_timeLag} disabled={turno.turnos?.[index]?.furnace_timeLag} inputMode='numeric' />
                        <h2>Hot Oil Unit</h2>
                        <div className='title-machine'>Oil Flow</div>
                        <input name='hotOilUnit_oilFlow' type='number' value={turno.turnos?.[index]?.hotOilUnit_oilFlow} disabled={turno.turnos?.[index]?.hotOilUnit_oilFlow} inputMode='numeric' />
                        <div className='title-machine'>Cover Half</div>
                        <input name='hotOilUnit_coverHalf' type='number' value={turno.turnos?.[index]?.hotOilUnit_coverHalf} disabled={turno.turnos?.[index]?.hotOilUnit_coverHalf} inputMode='numeric' />
                        <div className='title-machine'>Ejector Half Temp</div>
                        <input name='hotOilUnit_ejectorHalfTemp' type='number' value={turno.turnos?.[index]?.hotOilUnit_ejectorHalfTemp} disabled={turno.turnos?.[index]?.hotOilUnit_ejectorHalfTemp} inputMode='numeric' />
                        <h2>Vaccum</h2>
                        <div className='title-machine'>Channel A</div>
                        <input name='vacuum_channelA' type='number' value={turno.turnos?.[index]?.vacuum_channelA} disabled={turno.turnos?.[index]?.vacuum_channelA} inputMode='numeric' />
                        <div className='title-machine'>Channel B</div>
                        <input name='vacuum_channelB' type='number' value={turno.turnos?.[index]?.vacuum_channelB} disabled={turno.turnos?.[index]?.vacuum_channelB} inputMode='numeric' />
                        <h2>Jet Cooling</h2>
                        <div className='title-machine'>Discharge Pressure</div>
                        <input name='jetCooling_dischargePressure' type='number' value={turno.turnos?.[index]?.jetCooling_dischargePressure} disabled={turno.turnos?.[index]?.jetCooling_dischargePressure} inputMode='numeric' />
                        <div className='title-machine'>Time</div>
                        <input name='jetCooling_time' type='number' value={turno.turnos?.[index]?.jetCooling_time} disabled={turno.turnos?.[index]?.jetCooling_time} inputMode='numeric' />
                    </section> : <Spinner />}
            </form>
        </>
    )
}

export default Turno