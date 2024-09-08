"use client";
import React, { useState } from 'react';
import "../../styles/form-style.css";
import Button from "../FormComponent/Button";
import { Toaster, toast } from "sonner";

export const AddCompanyComponent: React.FC = () => {
  const [name, setName] = useState('');
  const [cuit, setCuit] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validación simple de campos obligatorios
    if (!name || !cuit || !address) {
      setErrorMessage('Todos los campos son obligatorios');
      return;
    }

    const companyData = {
      name,
      address,
      cuit: parseInt(cuit, 10), // Aseguramos que CUIT sea un número
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Empresa añadida correctamente");
        console.log(result);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Error al añadir la empresa');
      }
    } catch (error: any) {
      console.error("Error al añadir la empresa", error);
      toast.error('Hubo un problema al añadir la empresa. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Toaster richColors />

      <form className="form-apply" onSubmit={handleSubmit}>
        <h1 className="text-center text-[1.2rem] mb-6">Añadir Empresa</h1>

        <div className="mb-4">
          <label className="label-apply" htmlFor="name">Razón Social:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="cuit">CUIT:</label>
          <input
            type="number"
            id="cuit"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label-apply" htmlFor="address">Dirección:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-apply"
            required
          />
        </div>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

        <Button type="submit">Guardar Empresa</Button>
      </form>
    </div>
  );
};

export default AddCompanyComponent;
