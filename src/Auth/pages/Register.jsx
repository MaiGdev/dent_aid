/* import React, { useState } from "react";

function RegisterPage() {
  const [step, setStep] = useState(1); // Paso actual
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Función para actualizar los datos del formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para avanzar al siguiente paso
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Función para retroceder al paso anterior
  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  // Función para enviar el formulario (cuando se llegue al último paso)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
  };

  // Dependiendo del paso, mostrar diferentes formularios
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <label>
              Correo Electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <label>
              Contraseña:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
        );
      default:
        return <div>Formulario completado</div>;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Paso {step}</h2>
      {renderStep()}

      <div>
        {step > 1 && (
          <button type="button" onClick={prevStep}>
            Anterior
          </button>
        )}

        {step < 3 ? (
          <button type="button" onClick={nextStep}>
            Siguiente
          </button>
        ) : (
          <button type="submit">Enviar</button>
        )}
      </div>
    </form>
  );
}

export default RegisterPage;
 */