// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Datos de los artículos (simulados - en una implementación real podrían venir de una base de datos)
    const articulos = {
        'articulo-1': {
            titulo: 'Guía de compra: Procesadores 2025',
            fecha: '15 de febrero, 2025',
            imagen: 'https://i.ytimg.com/vi/MPXPwSmvInI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDBNtJ2EDrf8czsCvZxq1g-0ebKbg',
            contenido: `<p>En este artículo completo, analizamos los mejores procesadores del mercado para diferentes necesidades. Desde gaming de alto rendimiento hasta estaciones de trabajo profesionales, te ayudamos a tomar la mejor decisión para tu próxima configuración.</p>
                        <h4>Procesadores para Gaming</h4>
                        <p>Para gamers, recomendamos procesadores con alto rendimiento en un solo núcleo y frecuencias elevadas. Los últimos modelos de Intel Core i9 y AMD Ryzen 9 ofrecen un rendimiento excepcional para juegos de última generación.</p>
                        <h4>Procesadores para Workstations</h4>
                        <p>Si necesitas una estación de trabajo para renderizado 3D, edición de video o compilación de código, los procesadores con mayor número de núcleos como AMD Threadripper o Intel Xeon serán tu mejor opción.</p>
                        <h4>Mejor relación calidad-precio</h4>
                        <p>Para usuarios con presupuesto limitado, los procesadores de gama media como AMD Ryzen 5 o Intel Core i5 ofrecen un rendimiento excepcional sin vaciar tu bolsillo.</p>`
        },
        'articulo-2': {
            titulo: 'Tarjetas gráficas: ¿AMD o NVIDIA?',
            fecha: '10 de febrero, 2025',
            imagen: 'https://i.blogs.es/09647f/grafica/1366_2000.jpeg',
            contenido: `<p>Análisis comparativo entre las últimas generaciones de tarjetas gráficas de AMD y NVIDIA para ayudarte a decidir cuál es la mejor opción para tu sistema.</p>
                        <h4>Rendimiento en juegos</h4>
                        <p>NVIDIA generalmente ofrece mejor rendimiento en juegos que utilizan tecnologías como Ray Tracing, mientras que AMD suele proporcionar mejor rendimiento por euro invertido en juegos tradicionales.</p>
                        <h4>Tecnologías exclusivas</h4>
                        <p>NVIDIA cuenta con DLSS para mejorar el rendimiento, mientras que AMD tiene FSR. Ambas tecnologías buscan aumentar los FPS sin sacrificar demasiada calidad visual.</p>
                        <h4>Consumo energético</h4>
                        <p>En las últimas generaciones, AMD ha conseguido mejorar significativamente la eficiencia energética de sus GPU, acercándose a los niveles de NVIDIA.</p>`
        },
        'articulo-3': {
            titulo: 'Refrigeración líquida vs. aire',
            fecha: '5 de febrero, 2025',
            imagen: 'https://www.profesionalreview.com/wp-content/uploads/2019/07/Refrigeracion-liquida-vs-aire.jpg',
            contenido: `<p>Ventajas y desventajas de cada sistema de refrigeración para tu PC gaming o workstation profesional.</p>
                        <h4>Refrigeración por aire</h4>
                        <p>Pros: Más económica, sin riesgo de fugas, menor mantenimiento.</p>
                        <p>Contras: Mayor tamaño, puede ser más ruidosa a pleno rendimiento, menor capacidad de disipación.</p>
                        <h4>Refrigeración líquida</h4>
                        <p>Pros: Mejor disipación térmica, diseño más limpio, menor ruido a cargas elevadas.</p>
                        <p>Contras: Mayor coste inicial, riesgo potencial de fugas, requiere mantenimiento periódico.</p>
                        <h4>¿Cuál elegir?</h4>
                        <p>Si realizas overclocking intensivo o tienes un procesador de gama alta, la refrigeración líquida puede ser tu mejor opción. Para la mayoría de usuarios, un buen disipador de aire será suficiente.</p>`
        },
        'articulo-4': {
            titulo: 'SSD vs HDD: Guía definitiva de almacenamiento',
            fecha: '1 de febrero, 2025',
            imagen: 'https://www.lappymaker.com/blog/wp-content/uploads/2021/06/SSD-vs-HDD.png',
            contenido: `<p>Descubre las diferencias entre unidades de estado sólido y discos duros tradicionales para elegir el almacenamiento ideal para tu sistema.</p>
                        <h4>Velocidad de transferencia</h4>
                        <p>Los SSD son significativamente más rápidos, con velocidades de lectura/escritura que pueden ser hasta 10 veces superiores a los HDD tradicionales.</p>
                        <h4>Durabilidad</h4>
                        <p>Los SSD no tienen partes móviles, lo que los hace más resistentes a golpes y vibraciones, ideal para portátiles.</p>
                        <h4>Capacidad y precio</h4>
                        <p>Los HDD siguen ofreciendo mayor capacidad por euro invertido, siendo ideales para almacenamiento masivo de datos.</p>
                        <h4>Configuración recomendada</h4>
                        <p>Lo ideal es combinar ambos: un SSD para el sistema operativo y programas, y un HDD para almacenamiento a largo plazo.</p>`
        },
        'articulo-5': {
            titulo: 'Overclocking: Mejora el rendimiento de tu PC',
            fecha: '25 de enero, 2025',
            imagen: 'https://www.lacuracaonline.com/media/wysiwyg/Blog/CuerpoArticulo/shutterstock_2154436615.jpg',
            contenido: `<p>Aprende técnicas seguras para aumentar la velocidad de tu procesador y tarjeta gráfica sin comprometer la estabilidad del sistema.</p>
                        <h4>¿Qué es el overclocking?</h4>
                        <p>El overclocking consiste en aumentar la frecuencia de funcionamiento de un componente por encima de los valores establecidos por el fabricante.</p>
                        <h4>Requisitos previos</h4>
                        <p>Necesitarás un sistema de refrigeración adecuado, una fuente de alimentación de calidad y componentes que permitan overclocking (CPU desbloqueada, placa base compatible).</p>
                        <h4>Proceso básico</h4>
                        <p>Aumenta gradualmente la frecuencia mientras realizas pruebas de estabilidad. Si encuentras errores, incrementa ligeramente el voltaje o reduce la frecuencia.</p>
                        <h4>Precauciones</h4>
                        <p>El overclocking puede reducir la vida útil de los componentes y anular la garantía. Realízalo bajo tu propia responsabilidad.</p>`
        },
        'articulo-6': {
            titulo: 'Guía de fuentes de poder: Eficiencia y calidad',
            fecha: '15 de enero, 2025',
            imagen: 'https://i.ytimg.com/vi/krRs18m6fLg/maxresdefault.jpg',
            contenido: `<p>Cómo elegir la fuente de poder perfecta para tu configuración de PC gaming o workstation.</p>
                        <h4>Potencia necesaria</h4>
                        <p>Calcula el consumo total de todos tus componentes y añade un margen del 20-30% para futuras ampliaciones y picos de consumo.</p>
                        <h4>Certificación 80 Plus</h4>
                        <p>Busca fuentes con certificación 80 Plus (Bronze, Silver, Gold, Platinum o Titanium) para garantizar la eficiencia energética.</p>
                        <h4>Modularidad</h4>
                        <p>Las fuentes modulares permiten conectar solo los cables necesarios, mejorando el flujo de aire y la estética del equipo.</p>
                        <h4>Protecciones</h4>
                        <p>Asegúrate de que la fuente incluya protecciones OVP, UVP, OCP, OPP y SCP para garantizar la seguridad de tus componentes.</p>`
        }
    };

    // Crear el modal dinámicamente y añadirlo al body
    const modalHTML = `
        <div class="modal fade" id="articuloModal" tabindex="-1" aria-labelledby="articuloModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="articuloModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <img id="modalImagen" class="img-fluid rounded mb-4" alt="">
                        <p id="modalFecha" class="text-muted"><i class="bi bi-calendar"></i> </p>
                        <div id="modalContenido"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Obtener todos los botones "Leer más" y "Leer artículo completo"
    const botonesLeerMas = document.querySelectorAll('.article-card .btn-outline-primary, .article-detailed .btn-primary');
    
    // Añadir event listeners a cada botón
    botonesLeerMas.forEach((boton) => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Usar un atributo data-id para identificar el artículo de manera más confiable
            const articuloId = boton.getAttribute('data-id');
            
            // Si encontramos el artículo, mostrar el modal con su información
            if (articuloId && articulos[articuloId]) {
                const articulo = articulos[articuloId];
                document.getElementById('articuloModalLabel').textContent = articulo.titulo;
                document.getElementById('modalImagen').src = articulo.imagen;
                document.getElementById('modalImagen').alt = articulo.titulo;
                document.getElementById('modalFecha').innerHTML = `<i class="bi bi-calendar"></i> ${articulo.fecha}`;
                document.getElementById('modalContenido').innerHTML = articulo.contenido;
                
                // Mostrar el modal
                const modal = new bootstrap.Modal(document.getElementById('articuloModal'));
                modal.show();
            }
        });
    });

    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme);
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateDarkModeIcon(newTheme);
        });
    }

    function updateDarkModeIcon(theme) {
        const darkModeIcon = document.getElementById("darkModeIcon");
        if (darkModeIcon) {
            darkModeIcon.classList.toggle("bi-sun", theme === 'dark');
            darkModeIcon.classList.toggle("bi-moon", theme === 'light');
        }
    }
});
