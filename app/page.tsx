import AuthForm from '@/app/AuthForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
  return (
    <div className="flex flex-col  md:justify-center items-center bg-gray-900 h-screen ">
           <div className='border p-9 rounded-xl bg-white-900'>
            <AuthForm />
            </div>


            <h1 className='text-slate-900 font-thin text-lg bg-white rounded-full md:p-2 mt-4 p-2'>Waydiimaha Dadka</h1>
            <Accordion type="single" collapsible>
  <AccordionItem value="item-1" >
    <AccordionTrigger>
      <p className='text-white font-extra-bold text-lg '>
        yaa isticmaala applicayshank xogwadaag
      </p>
      </AccordionTrigger>
    <AccordionContent>
   <h1 className=' font-sarif from-neutral-50 text-white' >
   waxa is isticmaala ardayda ku nool aduunka oo dhan gaar ahaan aad waxa looga isticmaala somali
      walina applikayshankan gacanta lagama wada qaadin....
   </h1>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-1" >
    <AccordionTrigger>
      <p className='text-white font-extra-bold text-lg '>
        sidee laysku diwaan galiyaa
      </p>
      </AccordionTrigger>
    <AccordionContent>
   <h1 className=' font-sarif from-neutral-50 text-white' >
            kaliya emailkaaga gali dabadeed linkiga laguuguso diro emailkaga kudhufo
   </h1>
    </AccordionContent>
  </AccordionItem>
</Accordion>



    </div>
  )
}