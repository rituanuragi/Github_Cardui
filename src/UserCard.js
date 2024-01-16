import React, { useState } from 'react';
import axios from 'axios';

function UserCard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.status === 200) {
        setUserData(response.data);
        setError(null);
        setSuccessMessage('Account found successfully!');
      } else {
        setError('Account not found. Please try again.');
        setUserData(null);
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error fetching user data. Please try again.');
      setUserData(null);
      setSuccessMessage(null);
    }
  }

  const handleRefresh = () => {
    setUsername('');
    setUserData(null);
    setError(null);
    setSuccessMessage(null);
  }

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-100 text-black'}`}>
      <div className={`max-w-md p-4 bg-white rounded-lg shadow-lg ${darkMode ? 'dark:bg-gray-800 dark:text-white' : ''}`}>
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md">
        <label className={`text-lg ${darkMode ? 'text-black' : 'text-gray-800'} mb-4`}>
  GitHub Username:
</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-2 rounded-md border border-gray-300 text-lg focus:outline-none focus:border-blue-500 ${darkMode ? 'text-black' : 'text-black'}`}
          />
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full mt-4 w-full focus:outline-none ${darkMode ? 'hover:text-white' : 'hover:text-white'}`}
          >
            Submit
          </button>
        </form>
        <div className={`mt-4 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
          <button
            className={`text-blue-600 hover:text-blue-800 ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-800'}`}
            onClick={handleRefresh}
          >
            Refresh Data
          </button>
          <button
            className={`ml-4 text-blue-600 hover:text-blue-800 ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-800'}`}
            onClick={handleToggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {error && (
          <div className={`text-red-600 mt-4 text-center ${darkMode ? 'text-red-300' : 'text-red-600'}`}>{error}</div>
        )}
        {successMessage && (
          <div className={`text-green-600 mt-4 text-center ${darkMode ? 'text-green-300' : 'text-green-600'}`}>{successMessage}</div>
        )}
        {userData && (
          <div className="user-card mt-4 p-4 border border-gray-300 rounded-lg">
            <img src={userData.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full mx-auto" />
            <h2 className={`text-gray-700 text-center ${darkMode ? 'text-' : 'text-black'} mt-4`}>{userData.login}</h2>
            <p className={`text-gray-700 text-center ${darkMode ? 'text-grey' : 'text-black'} mt-2`}>Name: {userData.name || 'N/A'}</p>
            <p className={`text-gray-700 text-center ${darkMode ? 'text-grey': 'text-black'}`}>Public Repos: {userData.public_repos}</p>
            <p className={`text-gray-700 text-center ${darkMode ? 'text-grey' : 'text-black'}`}>Public Gists: {userData.public_gists}</p>
            <p className={`text-gray-700 text-center ${darkMode ? 'text-grey' : 'text-black'}`}>

            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
