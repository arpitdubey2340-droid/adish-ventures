export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-adish-green to-adish-dark py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-serif font-bold text-white mb-4">
            About Us: Empowering Your Natural Potential
          </h1>
          <p className="text-xl text-adish-beige max-w-2xl">
            Nature holds the key to unlocking peak human performance
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Mission & Philosophy */}
          <div>
            <p className="text-xl text-adish-green leading-relaxed mb-6 font-medium">
              At <strong className="text-adish-dark">Adish Ventures</strong>, we believe that nature holds the key to unlocking peak human performance. Our mission is to bridge the gap between ancient botanical wisdom and modern wellness by providing premium-grade <em>Cordyceps militaris</em> products designed for those who refuse to settle.
            </p>
          </div>

          {/* Philosophy Section */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-adish-dark mb-8">
              Our Philosophy
            </h2>
            <p className="text-lg text-adish-green leading-relaxed">
              We don't just supply supplements; we supply fuel for your ambition. Whether you are an athlete looking to push your physical limits, a professional seeking sustained mental clarity, or someone simply striving for a more vibrant, energized lifestyle, our products are crafted to support your body's natural rhythm.
            </p>
          </div>

          {/* Quality Without Compromise */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-adish-dark mb-8">
              Quality Without Compromise
            </h2>

            <p className="text-lg text-adish-green leading-relaxed mb-12">
              We understand that when it comes to your health, purity is non-negotiable. That is why Adish Ventures is built on a foundation of rigorous quality control and transparency. Every batch of our <em>Cordyceps militaris</em>—whether in tincture or extract powder form—is cultivated to ensure maximum potency and bioavailability.
            </p>

            {/* Foundational Architecture Image */}
            <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
              <img
                src="/images/about/foundational-architecture.png"
                alt="The Foundational Architecture - Purity, Purpose, Potency"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-adish-beige p-6 rounded-lg border-l-4 border-adish-gold">
                <h3 className="font-bold text-adish-dark mb-3">Premium Sourcing</h3>
                <p className="text-adish-green text-sm">
                  We prioritize nutrient-dense, high-quality <em>Cordyceps militaris</em>.
                </p>
              </div>

              <div className="bg-adish-beige p-6 rounded-lg border-l-4 border-adish-gold">
                <h3 className="font-bold text-adish-dark mb-3">Bioavailability Focused</h3>
                <p className="text-adish-green text-sm">
                  Our dual-extraction processes ensure that you receive the full spectrum of the mushroom's bioactive compounds, including cordycepin and polysaccharides.
                </p>
              </div>

              <div className="bg-adish-beige p-6 rounded-lg border-l-4 border-adish-gold">
                <h3 className="font-bold text-adish-dark mb-3">Purity Guaranteed</h3>
                <p className="text-adish-green text-sm">
                  We believe in clean labels. Our products are free from unnecessary fillers, ensuring that you get nothing but the best from every dose.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-4xl font-serif font-bold text-adish-dark mb-8">
              Why Choose Us?
            </h2>
            <p className="text-lg text-adish-green leading-relaxed mb-6">
              In a market saturated with generic supplements, Adish Ventures stands apart through our dedication to efficacy. By concentrating on the science of <em>Cordyceps Militaris</em>, we provide a reliable, consistent, and potent solution for energy, endurance, and overall well-being.
            </p>
            <div className="bg-adish-beige p-8 rounded-lg border-l-4 border-adish-gold">
              <p className="text-lg text-adish-green leading-relaxed font-medium">
                We are here to support your journey, every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
