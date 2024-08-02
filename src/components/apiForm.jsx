'use client'

import { useState } from 'react'

const ApiForm = () => {
    const [data, setData] = useState('')
    const [selectedOptions, setSelectedOptions] = useState({
        alphabets: false,
        numbers: false,
        highestAlphabet: false,
    })
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    const handleOptionChange = (e) => {
        const { name, checked } = e.target
        setSelectedOptions((prev) => ({ ...prev, [name]: checked }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setResponse(null)

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
        }
    }

    return (
        <div className='max-w-xl mx-auto p-4'>
            <h1 className='text-2xl font-bold mb-4'>API Form</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium'>
                        Data (comma-separated)
                    </label>
                    <input
                        type='text'
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        className='mt-1 text-black block w-full p-2 border border-gray-300 rounded-md'
                        placeholder='e.g. M,1,334,4'
                    />
                </div>
                <div className='space-y-2'>
                    <label className='block text-sm font-medium'>
                        Select Options to Display
                    </label>
                    <div>
                        <input
                            type='checkbox'
                            id='alphabets'
                            name='alphabets'
                            checked={selectedOptions.alphabets}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor='alphabets' className='ml-2'>
                            Alphabets
                        </label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            id='numbers'
                            name='numbers'
                            checked={selectedOptions.numbers}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor='numbers' className='ml-2'>
                            Numbers
                        </label>
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            id='highestAlphabet'
                            name='highestAlphabet'
                            checked={selectedOptions.highestAlphabet}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor='highestAlphabet' className='ml-2'>
                            Highest Alphabet
                        </label>
                    </div>
                </div>
                <button
                    type='submit'
                    className='px-4 py-2 bg-blue-600 text-white rounded-md'
                >
                    Submit
                </button>
            </form>
            {error && <p className='mt-4 text-red-600'>{error}</p>}
            {response && (
                <div className='mt-4 p-4 border border-gray-300 rounded-md'>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default ApiForm
