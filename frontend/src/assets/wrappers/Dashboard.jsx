import styled from 'styled-components';

const Wrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #007bff;
    color: #fff;

    h2 {
      margin: 0;
    }

    button {
      color: #007bff;
      background: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  main {
    padding: 2rem;
    color: #555;
    display: grid;
    gap: 1rem;

    @media (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
    }

    .expenses {
      flex: 1;
      border-radius: 10px;
    }

    .filter-expenses {
      margin-bottom: 1rem;
    }

    .section-expenses {
      border-radius: 10px;
      background: #f9f9f9;
      padding: 0.5rem;
      border: 1px solid #328ff3;
    }

    h3 {
      margin-top: 0;
      color: #333;
    }

    label {
      font-weight: bold;
      display: inline-block;
      margin-right: 10px;
      color: #555;
    }

    input {
      background-color: #ccc;
      color: #333;
      margin-bottom: 15px;
      padding: 8px;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;

      &:focus {
        outline: none;
        border-color: #007bff;
      }
    }

    button {
      background-color: #ccc;
      color: #333;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #bbb;
      }
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 10px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .expenses-section {
      max-height: 19rem;
      margin-top: 1rem;
      overflow-y: auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .expenses-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .expenses-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      padding: 10px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .expenses-list li .expense-details {
      display: flex;
      flex: 1;
      justify-content: space-between;
      gap: 1rem;
    }

    .expense-text {
      flex: 1;
      text-align: left;
      white-space: normal;
      word-wrap: break-word;
      overflow-wrap: anywhere;
    }

    .date-text {
      flex: 1.5;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .amount-text {
      text-align: center;
    }

    .expenses-list li button {
      flex-shrink: 0;
      margin-left: 0.5rem;
    }

    .expenses-section::-webkit-scrollbar {
      width: 5px;
    }

    .expenses-section::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }

    .expenses-section::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }

    .chart {
      padding: 1rem;
      border: 1px solid #328ff3;
      border-radius: 8px;
      background-color: #f9f9f9;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

      .loading {
        text-align: center;
        font-size: 1.2rem;
        color: #555;
      }
    }
  }
`;

export default Wrapper;
