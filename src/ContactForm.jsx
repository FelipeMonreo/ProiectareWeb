import { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (
      name.trim() === '' ||
      email.trim() === '' ||
      message.trim() === ''
    ) {
      setFeedback('Completeaza toate campurile!');
      return;
    }

    setFeedback('Multumim, ' + name + '!');
  }

  return (
    <div>
      <h2>Formular de contact</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Nume:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Mesaj:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button type="submit">
          Submit
        </button>

      </form>

      <p>{feedback}</p>
    </div>
  );
}

export default ContactForm;