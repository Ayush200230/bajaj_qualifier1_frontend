'use client'

// import { useState, useEffect } from 'react'
// import Select from 'react-select'
// import { validateData, formatData } from '../utils/validation'

// const options = [
//     { value: 'alphabets', label: 'Alphabets' },
//     { value: 'numbers', label: 'Numbers' },
//     { value: 'highestAlphabet', label: 'Highest Alphabet' },
// ]

// const DataInput = ({ dataFormat, data, setData, isValidData }) => (
//     <div>
//         <label className='block text-sm font-medium text-gray-700'>
//             {dataFormat === 'comma'
//                 ? 'Data (comma-separated)'
//                 : 'Data (JSON format)'}
//         </label>
//         <textarea
//             rows={4}
//             value={data}
//             onChange={(e) => setData(e.target.value)}
//             className={`mt-1 block w-full p-3 border rounded-md ${
//                 isValidData ? 'border-gray-300' : 'border-red-500'
//             } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//             placeholder={
//                 dataFormat === 'comma'
//                     ? 'e.g. M,1,334,4'
//                     : '{"data":["M","1","334","4","B"]}'
//             }
//         />
//         {!isValidData && data && (
//             <p className='mt-1 text-red-600 text-sm'>
//                 Data must be valid: single alphabets or numbers.
//             </p>
//         )}
//     </div>
// )

// const FilteredResponse = ({ response, selectedOptions }) => (
//     <div className='mt-4 p-4 border border-gray-300 rounded-md bg-white'>
//         <h2 className='text-xl font-bold mb-2 text-gray-800'>
//             Filtered Response
//         </h2>
//         <pre className='text-gray-700'>
//             {selectedOptions.some((option) => option.value === 'numbers') && (
//                 <div>
//                     <strong>Numbers:</strong>{' '}
//                     {JSON.stringify(response.numbers, null, 2)}
//                 </div>
//             )}
//             {selectedOptions.some((option) => option.value === 'alphabets') && (
//                 <div>
//                     <strong>Alphabets:</strong>{' '}
//                     {JSON.stringify(response.alphabets, null, 2)}
//                 </div>
//             )}
//             {selectedOptions.some(
//                 (option) => option.value === 'highestAlphabet',
//             ) && (
//                 <div>
//                     <strong>Highest Alphabet:</strong>{' '}
//                     {JSON.stringify(response.highest_alphabet, null, 2)}
//                 </div>
//             )}
//         </pre>
//     </div>
// )

// const ApiForm = () => {
//     const [data, setData] = useState('')
//     const [dataFormat, setDataFormat] = useState('comma')
//     const [selectedOptions, setSelectedOptions] = useState([])
//     const [response, setResponse] = useState(null)
//     const [error, setError] = useState(null)
//     const [isValidData, setIsValidData] = useState(false)
//     const [isSubmitting, setIsSubmitting] = useState(false)

//     useEffect(() => {
//         setIsValidData(validateData(data, dataFormat))
//     }, [data, dataFormat])

//     const handleOptionChange = (selected) => {
//         setSelectedOptions(selected || [])
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setError(null)
//         setResponse(null)
//         setIsSubmitting(true)

//         if (!data.trim()) {
//             setError('Input is needed.')
//             setIsSubmitting(false)
//             return
//         }

//         if (!isValidData) {
//             setError('Data must be valid: single alphabets or numbers.')
//             setIsSubmitting(false)
//             return
//         }

//         if (selectedOptions.length === 0) {
//             setError('Select at least one option.')
//             setIsSubmitting(false)
//             return
//         }

//         const formattedData = formatData(data, dataFormat)

//         try {
//             const res = await fetch(
//                 'https://bajaj-qualifier1-backend.onrender.com/bfhl',
//                 {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ data: formattedData }),
//                 },
//             )

//             if (!res.ok) {
//                 throw new Error('Network response was not ok')
//             }

//             const result = await res.json()

//             const filteredResponse = {
//                 is_success: result.is_success,
//                 user_id: result.user_id,
//                 email: result.email,
//                 roll_number: result.roll_number,
//                 ...(selectedOptions.some(
//                     (option) => option.value === 'numbers',
//                 ) && { numbers: result.numbers }),
//                 ...(selectedOptions.some(
//                     (option) => option.value === 'alphabets',
//                 ) && { alphabets: result.alphabets }),
//                 ...(selectedOptions.some(
//                     (option) => option.value === 'highestAlphabet',
//                 ) && { highest_alphabet: result.highest_alphabet }),
//             }

//             setResponse(filteredResponse)
//         } catch (err) {
//             setError('Failed to fetch response from the server.')
//         } finally {
//             setIsSubmitting(false)
//         }
//     }

//     return (
//         <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
//             <h1 className='text-2xl font-bold mb-6 text-center text-blue-700'>
//                 Form
//             </h1>
//             <form onSubmit={handleSubmit} className='space-y-6'>
//                 <div>
//                     <label className='block text-sm font-medium text-gray-700'>
//                         Data Input Method
//                     </label>
//                     <div className='flex space-x-4 mt-1'>
//                         <button
//                             type='button'
//                             onClick={() => setDataFormat('comma')}
//                             className={`px-4 py-2 rounded-md ${
//                                 dataFormat === 'comma'
//                                     ? 'bg-blue-600 text-white'
//                                     : 'bg-gray-200 text-gray-800'
//                             }`}
//                         >
//                             Comma-Separated
//                         </button>
//                         <button
//                             type='button'
//                             onClick={() => setDataFormat('json')}
//                             className={`px-4 py-2 rounded-md ${
//                                 dataFormat === 'json'
//                                     ? 'bg-blue-600 text-white'
//                                     : 'bg-gray-200 text-gray-800'
//                             }`}
//                         >
//                             JSON
//                         </button>
//                     </div>
//                 </div>
//                 <DataInput
//                     dataFormat={dataFormat}
//                     data={data}
//                     setData={setData}
//                     isValidData={isValidData}
//                 />
//                 {isValidData && (
//                     <div className='space-y-4'>
//                         <label className='block text-sm font-medium text-gray-700'>
//                             Select Options to Display
//                         </label>
//                         <Select
//                             isMulti
//                             options={options}
//                             value={selectedOptions}
//                             onChange={handleOptionChange}
//                             className='basic-single'
//                             classNamePrefix='select'
//                             placeholder='Select options...'
//                         />
//                     </div>
//                 )}
//                 <button
//                     type='submit'
//                     className={`px-4 py-2 w-full rounded-md ${
//                         isValidData
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-400 text-gray-700'
//                     } transition duration-200 ease-in-out hover:${
//                         isValidData ? 'bg-blue-700' : 'bg-gray-500'
//                     }`}
//                     disabled={!isValidData || isSubmitting}
//                 >
//                     {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//             </form>
//             {error && <p className='mt-4 text-red-600'>{error}</p>}
//             {response && (
//                 <FilteredResponse
//                     response={response}
//                     selectedOptions={selectedOptions}
//                 />
//             )}
//         </div>
//     )
// }

// export default ApiForm

'use client'

import { useState, useEffect } from 'react'
import Select from 'react-select'
import { validateData, formatData } from '../utils/validation'

const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestAlphabet', label: 'Highest Alphabet' },
]

const DataInput = ({ dataFormat, data, setData, isValidData }) => (
    <div>
        <label className='block text-sm font-medium text-gray-700'>
            {dataFormat === 'comma'
                ? 'Data (comma-separated)'
                : 'Data (JSON format)'}
        </label>
        <textarea
            rows={4}
            value={data}
            onChange={(e) => setData(e.target.value)}
            className={`mt-1 block w-full p-3 border rounded-md ${
                isValidData ? 'border-gray-300' : 'border-red-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder={
                dataFormat === 'comma'
                    ? 'e.g. M,1,334,4'
                    : '{"data":["M","1","334","4","B"]}'
            }
        />
        {!isValidData && data && (
            <p className='mt-1 text-red-600 text-sm'>
                Data must be valid: single alphabets or numbers.
            </p>
        )}
    </div>
)

const FilteredResponse = ({ response, selectedOptions }) => (
    <div className='mt-4 p-4 border border-gray-300 rounded-md bg-white'>
        <h2 className='text-xl font-bold mb-2 text-gray-800'>
            Filtered Response
        </h2>
        <pre className='text-gray-700'>
            {selectedOptions.some((option) => option.value === 'numbers') && (
                <div>
                    <strong>Numbers:</strong>{' '}
                    {JSON.stringify(response.numbers, null, 2)}
                </div>
            )}
            {selectedOptions.some((option) => option.value === 'alphabets') && (
                <div>
                    <strong>Alphabets:</strong>{' '}
                    {JSON.stringify(response.alphabets, null, 2)}
                </div>
            )}
            {selectedOptions.some(
                (option) => option.value === 'highestAlphabet',
            ) && (
                <div>
                    <strong>Highest Alphabet:</strong>{' '}
                    {JSON.stringify(response.highest_alphabet, null, 2)}
                </div>
            )}
        </pre>
    </div>
)

const ApiForm = () => {
    const [data, setData] = useState('')
    const [dataFormat, setDataFormat] = useState('comma')
    const [selectedOptions, setSelectedOptions] = useState([])
    const [response, setResponse] = useState(null)
    const [fullResponse, setFullResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isValidData, setIsValidData] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDataChanged, setIsDataChanged] = useState(false)

    useEffect(() => {
        setIsValidData(validateData(data, dataFormat))
    }, [data, dataFormat])

    const handleOptionChange = (selected) => {
        setSelectedOptions(selected || [])
    }

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

        if (selectedOptions.length === 0) {
            setError('Select at least one option.')
            setIsSubmitting(false)
            return
        }

        const formattedData = formatData(data, dataFormat)

        try {
            const res = await fetch(
                'https://bajaj-qualifier1-backend.onrender.com/bfhl',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: formattedData }),
                },
            )

            if (!res.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await res.json()
            setFullResponse(result)

            const filteredResponse = {
                is_success: result.is_success,
                user_id: result.user_id,
                email: result.email,
                roll_number: result.roll_number,
                ...(selectedOptions.some(
                    (option) => option.value === 'numbers',
                ) && { numbers: result.numbers }),
                ...(selectedOptions.some(
                    (option) => option.value === 'alphabets',
                ) && { alphabets: result.alphabets }),
                ...(selectedOptions.some(
                    (option) => option.value === 'highestAlphabet',
                ) && { highest_alphabet: result.highest_alphabet }),
            }

            setResponse(filteredResponse)
        } catch (err) {
            setError('Failed to fetch response from the server.')
        } finally {
            setIsSubmitting(false)
            setIsDataChanged(false)
        }
    }

    const handleTabChange = () => {
        if (data.trim() || response) {
            const confirmChange = window.confirm(
                'Changing the data format will reset your current input and response. Are you sure you want to proceed?',
            )
            if (!confirmChange) return
        }
        setData('')
        setResponse(null)
        setDataFormat((prevFormat) =>
            prevFormat === 'comma' ? 'json' : 'comma',
        )
    }

    return (
        <div className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg'>
            <h1 className='text-2xl font-bold mb-6 text-center text-blue-700'>
                Form
            </h1>
            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>
                        Data Input Method
                    </label>
                    <div className='flex space-x-4 mt-1'>
                        <button
                            type='button'
                            onClick={handleTabChange}
                            className={`px-4 py-2 rounded-md ${
                                dataFormat === 'comma'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            Comma-Separated
                        </button>
                        <button
                            type='button'
                            onClick={handleTabChange}
                            className={`px-4 py-2 rounded-md ${
                                dataFormat === 'json'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800'
                            }`}
                        >
                            JSON
                        </button>
                    </div>
                </div>
                <DataInput
                    dataFormat={dataFormat}
                    data={data}
                    setData={setData}
                    isValidData={isValidData}
                />
                {isValidData && (
                    <div className='space-y-4'>
                        <label className='block text-sm font-medium text-gray-700'>
                            Select Options to Display
                        </label>
                        <Select
                            isMulti
                            options={options}
                            value={selectedOptions}
                            onChange={handleOptionChange}
                            className='basic-single'
                            classNamePrefix='select'
                            placeholder='Select options...'
                        />
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
                <FilteredResponse
                    response={fullResponse}
                    selectedOptions={selectedOptions}
                />
            )}
        </div>
    )
}

export default ApiForm
