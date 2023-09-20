import React from 'react';

const ContactForm = () => {
  return (
    <div>
      <h2>Edit Information</h2>
      <form>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input type="contact" className='form-group__label' id="contact" name="contact" />
        </div>
        <button className='save-btn' type="submit">Save</button>
      </form>
    </div>
  );
};

export default ContactForm;