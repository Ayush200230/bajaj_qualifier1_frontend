'use client'

import { useState, useEffect } from 'react'

const ApiForm = () => {
    const [data, setData] = useState('')
    const [selectedOptions, setSelectedOptions] = useState({
        alphabets: false,
        numbers: false,
        highestAlphabet: false,
    })
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isValidData, setIsValidData] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleOptionChange = (e) => {
        const { name, checked } = e.target
        setSelectedOptions((prev) => ({ ...prev, [name]: checked }))
    }

    const validateData = (data) => {
        const items = data.split(',').map((item) => item.trim())
        return items.every((item) => /^[a-zA-Z]$|^\d+$/.test(item))
    }

    useEffect(() => {
        setIsValidData(validateData(data))
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setResponse(null)
        setIsSubmitting(true)

        if (!data.trim()) {
            setError('Input is needed.')
            setIsSubmitting(false)
            return
        }

        if (!isValidData) {
            setError('Data must be valid: single alphabets or numbers.')
            setIsSubmitting(false)
            return
        }

        if (!Object.values(selectedOptions).includes(true)) {
            setError('Select at least one option.')
            setIsSubmitting(false)
            return
        }

        try {
            const res = await fetch(
                'https://bajaj-qualifier1-backend.onrender.com/bfhl',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        data: data.split(',').map((item) => item.trim()),
                    }),
                },
            )

            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await res.json()

            const filteredResponse = {
                is_success: result.is_success,
                user_id: result.user_id,
                email: result.email,
                roll_number: result.roll_number,
                ...(selectedOptions.numbers && { numbers: result.numbers }),
                ...(selectedOptions.alphabets && {
                    alphabets: result.alphabets,
                }),
                ...(selectedOptions.highestAlphabet && {
                    highest_alphabet: result.highest_alphabet,
                }),
            }

            setResponse(filteredResponse)
        } catch (err) {
            setError('Failed to fetch response from the server.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-6 text-center text-blue-700'>
                API Form
            </h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Data (comma-separated)
                    </label>
                    <input
                        type='text'
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className={`mt-1 block w-full p-3 border rounded-md ${
                            isValidData ? 'border-gray-300' : 'border-red-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        placeholder='e.g. M,1,334,4'
                    />
                    {!isValidData && data && (
                        <p className='mt-1 text-red-600 text-sm'>
                            Data must be valid: single alphabets or numbers.
                        </p>
                    )}
                </div>
                {isValidData && (
                    <div className='space-y-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Select Options to Display
                        </label>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='alphabets'
                                    name='alphabets'
                                    checked={selectedOptions.alphabets}
                                    onChange={handleOptionChange}
                                    className='h-5 w-5 text-blue-600 border-gray-300 rounded'
                                />
                                <label
                                    htmlFor='alphabets'
                                    className='ml-2 text-gray-800'
                                >
                                    Alphabets
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='numbers'
                                    name='numbers'
                                    checked={selectedOptions.numbers}
                                    onChange={handleOptionChange}
                                    className='h-5 w-5 text-blue-600 border-gray-300 rounded'
                                />
                                <label
                                    htmlFor='numbers'
                                    className='ml-2 text-gray-800'
                                >
                                    Numbers
                                </label>
                            </div>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='highestAlphabet'
                                    name='highestAlphabet'
                                    checked={selectedOptions.highestAlphabet}
                                    onChange={handleOptionChange}
                                    className='h-5 w-5 text-blue-600 border-gray-300 rounded'
                                />
                                <label
                                    htmlFor='highestAlphabet'
                                    className='ml-2 text-gray-800'
                                >
                                    Highest Alphabet
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                <button
                    type='submit'
                    className={`px-4 py-2 w-full rounded-md ${
                        isValidData
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-400 text-gray-700'
                    } transition duration-200 ease-in-out hover:${
                        isValidData ? 'bg-blue-700' : 'bg-gray-500'
                    }`}
                    disabled={!isValidData || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {error && <p className='mt-4 text-red-600'>{error}</p>}
            {response && (
                <div className='mt-4 p-4 border border-gray-300 rounded-md bg-white'>
                    <h2 className='text-xl font-bold mb-2 text-gray-800'>
                        Filtered Response
                    </h2>
                    <pre className='text-gray-700'>
                        {selectedOptions.numbers && (
                            <div>
                                <strong>Numbers:</strong>{' '}
                                {JSON.stringify(response.numbers, null, 2)}
                            </div>
                        )}
                        {selectedOptions.alphabets && (
                            <div>
                                <strong>Alphabets:</strong>{' '}
                                {JSON.stringify(response.alphabets, null, 2)}
                            </div>
                        )}
                        {selectedOptions.highestAlphabet && (
                            <div>
                                <strong>Highest Alphabet:</strong>{' '}
                                {JSON.stringify(
                                    response.highest_alphabet,
                                    null,
                                    2,
                                )}
                            </div>
                        )}
                    </pre>
                </div>
            )}
        </div>
    )
}

export default ApiForm
