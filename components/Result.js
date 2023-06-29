import { useEffect, useState } from "react";
const Result = ({ participant }) => {
  const [signal,setSignal]=useState("text-gray-400")
  const [tsignal,setTsignal]=useState(`<p>Sending result. Do not close or switch tab.</p>`)
  const { name, email, usn, score } = participant;

  useEffect(() => {
    const sendParticipantData = async () => {
      console.log("Sending participant data");
      console.log(participant);
      try {
        const response = await fetch("/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(participant),
        });

        if (response.ok) {
          console.log("Participant data saved successfully");
          setSignal("text-gray-400 hidden")
        } else {
          console.error("Failed to save participant data");
          setSignal("text-gray-400 hidden")
          setTsignal(`<p classname="text-red-500">Failed to submit Result. Try reattempt</p>`)
        }
      } catch (error) {
        console.error("Error while sending participant data:", error);
      }
    };

    sendParticipantData();
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
      <p>
        Name: <strong>{name}</strong>
      </p>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <p>
        USN Number: <strong>{usn}</strong>
      </p>
      <p>
        Score: <strong>{score}</strong> out of <strong>100</strong>
      </p>
      <hr className={signal}/>
      <p className={signal}>{tsignal}</p>
    </div>
  );
};

export default Result;
