import React from "react";

const FormErrors = ({ error }: { error: string }) => {
  if (!error) return null;

  return (
    <div>
      <p className="modal-form_error">{error}</p>
    </div>
  );
};

export default FormErrors;
