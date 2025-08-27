
 'use client';
import { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Client-side contact submission uses an external form endpoint.
// Configure NEXT_PUBLIC_CONTACT_ENDPOINT to point to your form receiver (Formspree/Getform/etc.).
type SendEmailInput = {
  fullName: string;
  company?: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  useScrollAnimation(ref);
  const [formData, setFormData] = useState<SendEmailInput>({
    fullName: '',
    company: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
      if (!endpoint) {
        console.error('No contact endpoint configured. Set NEXT_PUBLIC_CONTACT_ENDPOINT.');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        company: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
  <section ref={ref} id="contact" className="scroll-animation py-20 bg-muted/50">
    <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-primary mb-4">Contact Me</h2>
      <p className="text-center text-muted-foreground mb-8">
        Have a project in mind? I'd love to hear from you.
      </p>
      <Card>
        <CardContent className="p-6">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Acme Inc." value={formData.company} onChange={handleChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Project Inquiry" value={formData.subject} onChange={handleChange} required />
            </div>
            <div>
                <Label htmlFor="message">Message</Label>
                <textarea id="message" className="w-full min-h-[100px] bg-background border border-input rounded-md p-2" placeholder="Your message..." value={formData.message} onChange={handleChange} required></textarea>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
             {submitStatus === 'success' && (
              <p className="text-center text-green-500">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-red-500">Failed to send message. Please try again later.</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  </section>
);
};
