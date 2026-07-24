export function LeadFormSection() {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0 z-0">
        <img src="/hero-property.png" alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#333]/80" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-white text-center">
        <h2 className="text-3xl font-bold">Request a call back.</h2>
        <p className="mt-4">Would you like to speak to one of our financial advisers? Just submit your contact details and we'll be in touch shortly.</p>
        <form className="grid md:grid-cols-3 gap-4 mt-8">
          <input className="text-black" placeholder="How can we help?" />
          <input className="text-black" placeholder="Your Name" />
          <input className="text-black" placeholder="Phone Number" />
        </form>
        <button className="bg-[var(--color-primary)] text-white px-8 py-3 mt-6 hover:bg-[var(--color-primary-light)]">SUBMIT</button>
      </div>
    </section>
  )
}
