import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [patientIdInput, setPatientIdInput] = useState("");
  const [age, setAge] = useState("");
  const [domicile, setDomicile] = useState("");
  const [gender, setGender] = useState("");

  const [patientData, setPatientData] = useState(null);
  const [allPatients, setAllPatients] = useState([]);

  const [searchId, setSearchId] = useState("");
  const [searchedPatient, setSearchedPatient] = useState(null);

  const [message, setMessage] = useState("");

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "1100px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f7f9fc",
    },

    header: {
      textAlign: "center",
      background: "linear-gradient(135deg, #a0c4ff, #bdb2ff)",
      padding: "20px",
      borderRadius: "12px",
      color: "#fff",
      marginBottom: "20px",
    },

    section: {
      backgroundColor: "#ffffff",
      padding: "15px",
      borderRadius: "12px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },

    input: {
      width: "calc(100% - 16px)",
      padding: "10px",
      margin: "6px 0",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
    },

    button: {
      padding: "10px 14px",
      marginTop: "8px",
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#7b9acc",
      color: "white",
      cursor: "pointer",
    },

    patientBox: {
      marginTop: "10px",
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: "#eef2ff",
    },

    patientList: {
      marginTop: "10px",
    },

    patientItem: {
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: "#f1f5f9",
      marginBottom: "8px",
    },
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setMessage("MetaMask not installed");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]);
      setIsConnected(true);
      setMessage("Wallet connected");
    } catch (error) {
      console.error(error);
      setMessage("Wallet connection failed");
    }
  };

  const getContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
  };

  const registerPatient = async () => {
    try {
      const contract = await getContract();

      const tx = await contract.registerPatient(
        patientIdInput,
        Number(age),
        domicile,
        gender
      );

      await tx.wait();

      setMessage("Patient registered successfully");

      setPatientIdInput("");
      setAge("");
      setDomicile("");
      setGender("");
    } catch (error) {
      console.error(error);
      setMessage(error.reason || "Registration failed");
    }
  };

  const getLatestPatient = async () => {
    try {
      const contract = await getContract();
      const count = await contract.patientCount();

      if (count === 0n) {
        setMessage("No patients found");
        return;
      }

      const latestId = Number(count) - 1;
      const data = await contract.getPatient(latestId);

      setPatientData({
        id: data[0],
        age: data[1].toString(),
        domicile: data[2],
        createdAt: new Date(Number(data[3]) * 1000).toLocaleString(),
      });
    } catch (error) {
      console.error(error);
      setMessage("Error fetching latest patient");
    }
  };

  const getAllPatients = async () => {
    try {
      const contract = await getContract();
      const count = await contract.patientCount();

      const patients = [];

      for (let i = 0; i < Number(count); i++) {
        const data = await contract.getPatient(i);

        patients.push({
          id: data[0],
          age: data[1].toString(),
          domicile: data[2],
        });
      }

      setAllPatients(patients);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch patients");
    }
  };

  const searchPatient = async () => {
    try {
      const contract = await getContract();

      const data = await contract.getPatient(Number(searchId));

      setSearchedPatient({
        id: data[0],
        age: data[1].toString(),
        domicile: data[2],
        createdAt: new Date(Number(data[3]) * 1000).toLocaleString(),
      });

      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Patient not found or invalid ID");
      setSearchedPatient(null);
    }
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.header}>Copper Hospital Registry</h1>

      <p style={{ textAlign: "center" }}>
        {isConnected
          ? `Connected: ${account}`
          : "Not connected to MetaMask"}
      </p>

      {message && <p style={{ textAlign: "center" }}>{message}</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        <div style={{ flex: "1", minWidth: "300px" }}>

          <div style={styles.section}>
            <h3>Wallet</h3>
            <button style={styles.button} onClick={connectWallet}>
              Connect MetaMask
            </button>
          </div>

          <div style={styles.section}>
            <h3>Register Patient</h3>

            <input
              style={styles.input}
              placeholder="Patient ID"
              value={patientIdInput}
              onChange={(e) => setPatientIdInput(e.target.value)}
            />

            <input
              style={styles.input}
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Domicile"
              value={domicile}
              onChange={(e) => setDomicile(e.target.value)}
            />

            <input
              style={styles.input}
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />

            <button style={styles.button} onClick={registerPatient}>
              Register
            </button>
          </div>

          <div style={styles.section}>
            <h3>Search Patient</h3>

            <input
              style={styles.input}
              placeholder="Enter Patient ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />

            <button style={styles.button} onClick={searchPatient}>
              Search
            </button>

            {searchedPatient && (
              <div style={styles.patientBox}>
                <p><b>ID:</b> {searchedPatient.id}</p>
                <p><b>Age:</b> {searchedPatient.age}</p>
                <p><b>Domicile:</b> {searchedPatient.domicile}</p>
                <p><b>Created:</b> {searchedPatient.createdAt}</p>
              </div>
            )}
          </div>

        </div>

        <div style={{ flex: "1", minWidth: "300px" }}>

          <div style={styles.section}>
            <h3>Latest Patient</h3>

            <button style={styles.button} onClick={getLatestPatient}>
              Fetch Latest
            </button>

            {patientData && (
              <div style={styles.patientBox}>
                <p><b>ID:</b> {patientData.id}</p>
                <p><b>Age:</b> {patientData.age}</p>
                <p><b>Domicile:</b> {patientData.domicile}</p>
                <p><b>Created:</b> {patientData.createdAt}</p>
              </div>
            )}
          </div>

          <div style={styles.section}>
            <h3>All Patients</h3>

            <button style={styles.button} onClick={getAllPatients}>
              Load Patients
            </button>

            <div style={styles.patientList}>
              {allPatients.map((p, i) => (
                <div key={i} style={styles.patientItem}>
                  <p><b>ID:</b> {p.id}</p>
                  <p><b>Age:</b> {p.age}</p>
                  <p><b>Domicile:</b> {p.domicile}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;