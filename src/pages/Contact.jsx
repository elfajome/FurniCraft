import PageHero from '../components/common/PageHero'
import FeaturesStrip from '../components/sections/FeaturesStrip'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { FiClock, FiMapPin, FiPhone } from 'react-icons/fi'

export default function Contact() {
  return (
    <div>
      <PageHero title="Contact" crumbs={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="container mx-auto px-4 py-14">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-text">Get In Touch With Us</h2>
          <p className="mt-3 text-text-muted">
            For more information about our product & services. Please feel free to drop us an email.
            Our staff always be there to help you out. Do not hesitate!
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-8">
            <div className="flex gap-4">
              <FiMapPin className="w-6 h-6 text-text mt-0.5" />
              <div>
                <p className="font-medium text-text">Address</p>
                <p className="text-sm text-text-muted mt-1">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <FiPhone className="w-6 h-6 text-text mt-0.5" />
              <div>
                <p className="font-medium text-text">Phone</p>
                <p className="text-sm text-text-muted mt-1">
                  Mobile: (+84) 546-6789
                  <br />
                  Hotline: (+84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <FiClock className="w-6 h-6 text-text mt-0.5" />
              <div>
                <p className="font-medium text-text">Working Time</p>
                <p className="text-sm text-text-muted mt-1">
                  Monday-Friday: 9:00 - 22:00
                  <br />
                  Saturday-Sunday: 9:00 - 21:00
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <form
              className="max-w-xl mx-auto lg:mx-0 space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input label="Your name" placeholder="Abc" />
              <Input type="email" label="Email address" placeholder="Abcdefg@domain.com" />
              <Input label="Subject" placeholder="This is an optional" />
              <div>
                <label className="block text-sm font-medium text-text mb-1">Message</label>
                <textarea
                  rows={5}
                  placeholder="Hi! I'd like to ask about"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
                />
              </div>
              <Button type="submit" size="lg" className="px-10">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>

      <FeaturesStrip />
    </div>
  )
}

