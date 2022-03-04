import React from "react";
import brokenGlass from '../assets/broken-glass.png'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    console.log(error , errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier interfaz de repuesto
      return <div className="h-screen w-screen grid place-content-center text-center text-2xl">
        <h1>Something went wrong. 😰 Please report this error if you can, thanks!</h1>
            <img width={200} className="justify-self-center p-10" src={brokenGlass} alt='vidrio roto'></img>
            <a href='/' >Click here to go to Home page 🏠</a>
      </div>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;