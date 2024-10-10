import React, { useState, useContex, useEffect, useRef } from "react";
import "./App.css";
import Up_down from "./components/up_down";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoPlaySharp } from "react-icons/io5";
import { GrPauseFill } from "react-icons/gr";
import { BiFontSize, BiRefresh } from "react-icons/bi";

// useContext for change variables
export const Break_length_session = React.createContext();

function App() {
  const [break_counts, setBreak_counts] = useState({
    b_length: 5,
    b_session: 25,
  });
  const [timeValues, setTimeValues] = useState({
    minute: break_counts.b_session,
    second: 0,
  });
  const [runTime, setRunTime] = useState(false);
  const [changeMinute, setChangeMinute] = useState(true);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const changeTimeValues = () =>{
    if(changeMinute){
      setTimeValues((prev)=>({
        ...prev,
        minute:break_counts.b_length
      }))
      setChangeMinute(false);
    }else{
      setTimeValues((prev)=>({
        ...prev,
        minute:break_counts.b_session
      }))
      setChangeMinute(true);
    }
    }
  

  useEffect(() => {
    if (runTime) {
      intervalRef.current = setInterval(() => {
        setTimeValues((prev) => {
          const { minute, second } = prev;
          if(minute == 0){
            changeTimeValues();
          }
          if (second > 0) {
            return { ...prev, second: second - 1 };
          } else if (minute > 0) {
            return { minute: minute - 1, second: 59 };
          } else {
            // Stop timer at 00:00
            clearInterval(intervalRef.current);
            return { ...prev, minute: break_counts.b_session, second: 0 };
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [runTime, break_counts.b_session]);

  useEffect(() => {
    setTimeValues({
      second:0,
      minute: break_counts.b_session,
    });
  }, [break_counts.b_session]);
  

  const calculate = (value, c_variables) => {
    switch (value) {
      case "-": 
        if (break_counts[c_variables] !== 1) {
          setBreak_counts((prev) => ({
            ...prev,
            [c_variables]: prev[c_variables] - 1,
          }));
        }
        break;
      case "+":
        if (break_counts[c_variables] !== 60) {
          setBreak_counts((prev) => ({
            ...prev,
            [c_variables]: prev[c_variables] + 1,
          }));
        }
        break;
    }
  };

  const button_style = {
    color:"white",
    fontSize:"25px",
    display:"flex",
    gap:"0"
  }

  return (
    <div className="App">
      <div className="clock">
        <h1>25 + 5 Clock</h1>

        {/* break buttons  */}

        <div className="breaks">
          <div className="length_session">
            <p id="break-label">Break Length</p>
            <div className="btns_grp">
              <Up_down
                value={"-"}
                id_name={"break-decrement"}
                for_icon={<FaArrowDown />}
                set_function={() => {
                  calculate("-", "b_length");
                }}
                togle_disabled={runTime}
              />
              <p id="break-length">{break_counts.b_length}</p>
              <Up_down
                value={"+"}
                id_name={"break-increment"}
                for_icon={<FaArrowUp />}
                set_function={() => {
                  calculate("+", "b_length");
                }}
                togle_disabled={runTime}
              />
            </div>
          </div>
          <div className="length_session">
            <p id="session-label">Session Length</p>
            <div className="btns_grp">
              <Up_down
                value={"-"}
                id_name={"session-decrement"}
                for_icon={<FaArrowDown />}
                set_function={() => {
                  calculate("-", "b_session");
                  setTimeValues((prev)=>({
                    ...prev,
                    minute:break_counts.b_session
                  }))
                }}
                togle_disabled={runTime}
              />
              <p id="session-length">{break_counts.b_session}</p>
              <Up_down
                value={"+"}
                id_name={"session-increment"}
                for_icon={<FaArrowUp />}
                set_function={() => {
                  calculate("+", "b_session");
                  setTimeValues((prev)=>({
                    ...prev,
                    minute:break_counts.b_session
                  }))
                }}
                togle_disabled={runTime}
              />
            </div>
          </div>
        </div>

        {/* break buttons */}

        {/* time */}

        <div className="timer" style={timeValues.minute ===1?{color:"red"}:{}}>
          <p id="timer-label">Session</p>
          <p id="time-left">
            <span className="minute">
              {timeValues.minute < 10
                ? `0${timeValues.minute}`
                : timeValues.minute}
            </span>
            :
            <span className="second">
              {timeValues.second < 10
                ? `0${timeValues.second}`
                : timeValues.second}
            </span>
          </p>
        </div>

        <div className="controlTime">
          <Up_down
            id_name={"start-stop"}
            for_icon={<IoPlaySharp />}
            for_icon2={<GrPauseFill />}
            set_function={()=>{setRunTime(!runTime);}}
            btn_style={button_style}
          />
          <Up_down
            id_name={"reset"}
            set_function={() => {
              setRunTime(false);
              clearInterval(intervalRef.current);
              setTimeValues({ minute: break_counts.b_session, second: 0 });
              setBreak_counts({ b_length: 5, b_session: 25 });
            }}
            for_icon={<BiRefresh />}
            btn_style={button_style}
          />
        </div>

        {/* time */}

        <div className="clock_footer">
          <p className="red_txt">Designed and Coded by</p>
          <a href="https://www.freecodecamp.org/no-stack-dub-sack" target="_blank" className="whiteBlue">Peter Weinberg</a>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
}
export default App;
