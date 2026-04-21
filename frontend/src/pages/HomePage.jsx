import Navbar from '../components/Navbar/Navbar';
import Button from '../components/Button/Button';
import Form from '../components/Form/Form';
import { useCreateRequest } from '../hooks/useCreateRequest';
import { scrollToSection } from '../utils/scroll';
import './HomePage.css';

const GALLERY_IMAGES = [
  '/photo1.jpg',
  '/photo2.jpg',
  '/photo3.jpg',
  '/photo4.jpg',
  '/photo5.jpg',
  '/photo6.jpg',
];

const STATS = [
  { value: '10+', label: 'лет опыта' },
  { value: '1000+', label: 'проведённых съёмок' },
  { value: '100%', label: 'довольных клиентов' },
];

const FORM_FIELDS = [
  {
    name: 'name',
    label: 'Имя',
    placeholder: 'Ваше имя',
    required: true,
  },
  {
    name: 'surname',
    label: 'Фамилия',
    placeholder: 'Ваша фамилия',
    required: true,
  },
  {
    name: 'phone',
    label: 'Телефон',
    placeholder: '+7 (999) 123-45-67',
    type: 'tel',
    required: true,
    validate: (value) =>
      /^\+?[0-9\s\-()]{7,20}$/.test(value) ? null : 'Некорректный телефон',
  },
  {
    name: 'date',
    label: 'Желаемая дата',
    type: 'datetime-local',
    required: true,
  },
  {
    name: 'comment',
    label: 'Комментарий',
    placeholder: 'Расскажите о своих пожеланиях',
    as: 'textarea',
  },
];

export default function HomePage() {
  const { submit, status, error } = useCreateRequest();

  async function handleSubmit(values) {
    await submit({
      ...values,
      date: new Date(values.date).toISOString(),
      comment: values.comment?.trim() || undefined,
    });
  }

  return (
    <>
      <Navbar onNavigate={scrollToSection} />

      <section className="greeting" id="greeting">
        <div className="container greeting__container">
          <div className="greeting__content">
            <h1 className="greeting__title">
              Место <br />
              где фото встречает инновацию!
            </h1>
            <p className="greeting__description">
              Мы создаём уникальные фотографии, которые вдохновляют и
              впечатляют, подбираем локации под каждого клиента и оставляем
              впечатление на долгие годы.
            </p>
            <Button size="large" onClick={() => scrollToSection('contacts')}>
              Связаться
            </Button>
          </div>
          <div className="greeting__image-wrapper">
            <img
              src="/greeting-image.svg"
              alt=""
              className="greeting__image"
            />
          </div>
        </div>
      </section>

      <section className="info" id="info">
        <div className="container info__wrapper">
          <div className="info__content">
            <span className="info__badge">О студии</span>
            <h2 className="info__title">
              Ваша идея <span>— наша забота</span>
              <br />
              о свете и кадре
            </h2>
            <div className="info__stats">
              {STATS.map((stat) => (
                <div className="info__stat" key={stat.label}>
                  <span className="info__stat-value">{stat.value}</span>
                  <span className="info__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="info__text">
              <p>
                Профессиональная фотостудия для вдохновляющих съёмок. Работаем
                «под ключ»: от выбора концепции до готовых фото.
              </p>
              <p>
                Мы работаем с 2014 года и за это время провели более тысячи
                съёмок: от семейных фотосессий до коммерческих проектов.
              </p>
              <p>
                Перед каждой съёмкой проводим консультацию, подбираем образы
                и локацию, создаём концепцию, которая отражает вашу
                индивидуальность.
              </p>
            </div>
          </div>
          <div className="info__image-wrapper">
            <img src="/photo7.jpg" alt="Фотостудия" className="info__image" />
          </div>
        </div>
      </section>

      <section className="works" id="works">
        <div className="container">
          <header className="works__header">
            <h2 className="works__title">Портфолио</h2>
            <p className="works__subtitle">Наши последние работы</p>
          </header>
          <div className="works__grid">
            {GALLERY_IMAGES.map((src, index) => (
              <figure className="works__item" key={src + index}>
                <img src={src} className="works__photo" alt="" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="contacts" id="contacts">
        <div className="container contacts__container">
          <div className="contacts__head">
            <h2 className="contacts__title">Оставьте заявку</h2>
            <p className="contacts__subtitle">
              Мы свяжемся с вами в ближайшее время
            </p>
          </div>
          <Form
            fields={FORM_FIELDS}
            submitText="Отправить заявку"
            onSubmit={handleSubmit}
            loading={status === 'loading'}
            error={status === 'error' ? error : null}
            success={status === 'success'}
            successMessage="Спасибо! Мы свяжемся с вами в ближайшее время."
          />
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__wrapper">
          <p>© 2026 DARYA TRENEVA</p>
        </div>
      </footer>
    </>
  );
}
