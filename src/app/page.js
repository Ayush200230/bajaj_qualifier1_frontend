import ApiForm from '@/components/apiForm'
// import Image from 'next/image'

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50'>
            <div className='text-6xl font-extrabold text-blue-700 mb-8'>
                RA2111003011823
            </div>
            <div className='w-full max-w-lg p-4 bg-white rounded-lg shadow-lg'>
                <ApiForm />
            </div>
        </main>
    )
}
