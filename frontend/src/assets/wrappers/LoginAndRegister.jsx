import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  padding: 20px;

  .form-container {
    background: #242424;
    padding: 30px;
    border-radius: 10px;
    box-shadow: -1px -1px 6px 1px rgb(255 255 255 / 10%);
    width: 100%;
    max-width: 400px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  h2 {
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    color: #ffffff;
  }

  .input-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    color: #ffffff;
  }

  input {
    width: 15em;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    background-color: #efefef;
    color: #333;
    caret-color: #333;
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }

  button {
    margin: 0 auto;
    width: 17em;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
  }
`;

export default Wrapper;
