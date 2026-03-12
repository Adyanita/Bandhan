import Navbar from '../../components/Navbar';
import RegisterForm from '../../components/RegisterForm';

export const metadata = {
  title: 'Create Profile — BandhanConnect',
  description: 'Create your free matrimonial profile on BandhanConnect.',
};

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '40px 40px 80px', maxWidth: 1000, margin: '0 auto' }}>
        <RegisterForm />
      </main>
    </>
  );
}
