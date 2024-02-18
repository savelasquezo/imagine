import React from 'react';


export default function Extra() {
  return (
      <main className='w-screen h-screen bg-gray-200 py-4 px-8'>
        <p className='text-center text-4xl my-4 font-semibold'>CHALLENGES</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 m-auto'>
            <div className='relative w-full h-60 flex flex-col items-center justify-start bg-white rounded-md shadow-lg'>
                <span className='text-center text-2xl uppercase font-semibold mt-4'>Funcion Lamda</span>
                <div className='w-full p-4 rounded-sm flex flex-col justify-start items-start px-8'>
                    <p className='text-sm text-left font-semibold'>calcVolumen = lambda package: package.height * package.width * package.depth</p>
                    <p className='text-sm text-left font-semibold'>data = Package.objects.all()</p>
                    <p className='text-sm text-left font-semibold'>listVolumen = list(map(calcVolumen, data))</p>
                </div>
                <p className='absolute bottom-1 text-xs p-4'>
                    La Funcion Lambda o funcion anonima en este caso sirve para calcular los volumenes de los paquestes
                    se toman los datos de las dimenciones y en una misma linea esta calcula su producto.
                </p> 
            </div>
            <div className='relative w-full h-60 flex flex-col items-center justify-start bg-white rounded-md shadow-lg'>
                <span className='text-center text-2xl uppercase font-semibold mt-4'>lookup table</span>
                <div className='w-full p-4 rounded-sm flex flex-col justify-start items-start px-8'>
                    <p className='text-sm text-left font-semibold'>def categorizarVolumen(vol):</p>
                    <p className='text-sm text-left font-semibold ml-4'>lookup_table ={"{(0, 10): 'liviano',(11, 20): 'estándar',(21, float('inf')): 'pesado'}"} </p>
                    <p className='text-sm text-left font-semibold ml-4 mt-2'>{"for rango, calse in lookup_table.items():"}</p>
                    <p className='text-sm text-left font-semibold ml-8'>{"if rango[0] <= volumen <= rango[1]:"}</p>
                    <p className='text-sm text-left font-semibold ml-12'>return categoria</p>
                </div>
                <p className='absolute bottom-1 text-xs p-4'>
                    Las Tablas Lookup son estructuras que almacenan valores para claves predeterminadas
                    Ejemplo Lookup para los estados del Paquete types = (('truck','Camion'),('car','Carro'),('motobyke','Moto'))
                </p> 
            </div>
            <div className='relative w-full h-60 flex flex-col items-center justify-start bg-white rounded-md shadow-lg'>
                <span className='text-center text-2xl uppercase font-semibold mt-4'>Fibonacci Recursivo</span>
                <div className='w-full p-4 rounded-sm flex flex-col justify-start items-start px-8'>
                    <p className='text-sm text-left font-semibold'>def fibonacci(n):</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"if n <= 0:"}</p>
                    <p className='text-sm text-left font-semibold ml-8'>return "Numero Invalido - Vuelve a Intentarlo"</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"response = (n - 1) if n <= 2 else (fibonacci(n - 1) + fibonacci(n - 2))"}</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"return response"}</p>
                </div>
                <p className='absolute bottom-1 text-xs p-4'>
                    La Funcion calcula el n-ésimo valor de la secuencia de Fibonacci le agrege operadores
                    para hacerla mas compacta, sirve para valores pequeños de n, para valores mas grande seria mejor usar bibliotecas
                </p> 
            </div>
            <div className='relative w-full h-60 flex flex-col items-center justify-start bg-white rounded-md shadow-lg'>
                <span className='text-center text-2xl uppercase font-semibold mt-4'>quickSort</span>
                <div className='w-full p-4 rounded-sm flex flex-col justify-start items-start px-8'>
                    <p className='text-sm text-left font-semibold'>def quickSort(list):</p>
                    <p className='text-sm text-left font-semibold ml-4'>idx = list[0]</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"menorIdx = [x for x in list[1:] if x <= idx]"}</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"mayorIdx = [x for x in list[1:] if x  > idx]"}</p>
                    <p className='text-sm text-left font-semibold ml-4'>{"return quickSort(menorIdx) + [idx] + quickSort(mayorIdx)  "}</p>
                </div>
                <p className='absolute bottom-1 text-xs p-4'>
                    La Funcion quickSort es de los mejores metodos para ordenar, aunque ya algunas bilbiotecas como numpy
                    ofrencen mejores metodos de ordenamiento para casos mas especificos.
                </p> 
            </div>  
        </div>
      </main>
  );
}
