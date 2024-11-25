import styled from 'styled-components';

const Wrapper = styled.div`
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup-content {
    background: #fff;
    padding: 30px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    animation: slide-down 0.3s ease-in-out;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h3 {
    margin-bottom: 20px;
    font-size: 1.6rem;
    text-align: center;
    color: #333;
  }

  .form-group {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  label {
    font-weight: bold;
    display: block;
    color: #555;
    width: 30%;
  }

  input {
    background-color: #ccc;
    color: #333;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
    width: 70%;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  button {
    background-color: #ccc;
    color: #333;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #bbb;
    }
  }

  .form-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  @keyframes slide-down {
    from {
      transform: translateY(-20%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default Wrapper;
