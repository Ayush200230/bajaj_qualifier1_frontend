import ApiForm from '@/components/apiForm'
import Image from 'next/image'

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='text-6xl font-extrabold'>RA2111003011823</div>
            <div>
                <ApiForm />
            </div>
        </main>
    )
}
