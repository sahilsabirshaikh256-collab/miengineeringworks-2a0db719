import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import { productsData } from "@/data/staticData";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const ProductSlider = () => {
  const products = productsData;
  return (
    <section className="py-16 md:py-20 bg-secondary/20 overflow-hidden" aria-label="Industrial Fasteners Collection">
      <div className="container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold tracking-[0.3em] uppercase text-primary">
            Industrial Fasteners Collection
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold mt-2 text-foreground">
            Premium <span className="text-gradient-gold">Industrial Fasteners</span> — Bolts, Nuts, Screws &amp; More
          </h2>
          <p className="text-sm text-muted-foreground mt-3 max-w-2xl mx-auto">
            Manufacturer &amp; supplier of all types of industrial fasteners including stud bolts, hex bolts, threaded rods, anchor bolts, nuts, washers, flanges &amp; pipe fittings in Mumbai, India.
          </p>
          <motion.div
            className="gold-divider w-20 mx-auto mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
        </motion.div>

        <div className="relative px-12">
          <Carousel
            opts={{ align: "center", loop: true, slidesToScroll: 1 }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
                playOnInit: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem
                  key={product.slug}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <Link
                    to={`/product/${product.slug}`}
                    className="group block bg-card rounded-lg border border-border overflow-hidden hover:border-primary/40 hover:shadow-gold transition-all duration-300"
                    data-testid={`slider-product-${product.slug}`}
                  >
                    <div className="aspect-square bg-secondary/30 flex items-center justify-center p-3 overflow-hidden">
                      <motion.img
                        src={product.image}
                        alt={`${product.name} Industrial Fastener`}
                        loading="lazy"
                        className="w-full h-full object-contain"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    </div>
                    <div className="p-3 border-t border-border text-center">
                      <h3 className="font-heading text-xs md:text-sm font-semibold text-foreground line-clamp-1">{product.name}</h3>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{product.standard}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
