import { useState } from "react";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase/firebaseConfig";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import fondo from './../assets/bg.jpg';

const Auth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [error, setError] = useState(""); // Estado para manejar el error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/quiniela");
    } catch (error) {
      console.error("Error: ", error);
      
      // Capturar errores específicos
      switch (error.code) {
        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;
        case "auth/user-not-found":
          setError("No se encontró un usuario con este correo.");
          break;
        case "auth/wrong-password":
          setError("La contraseña es incorrecta.");
          break;
        case "auth/email-already-in-use":
          setError("Este correo ya está registrado.");
          break;
        case "auth/weak-password":
          setError("La contraseña debe tener al menos 6 caracteres.");
          break;
        default:
          setError("Ocurrió un error. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="content_form">
      <h2>{isRegistering ? "Registrarse" : "Iniciar Sesión"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar el error */}
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input type="text" style={{textTransform: "capitalize"}} placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isRegistering ? "Registrarse" : "Iniciar Sesión"}</button>
      </form>
      
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
};

export default Auth;
