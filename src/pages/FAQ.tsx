import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs, FAQSchema } from "@/components/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqItems = [
  {
    question: "Каковы сроки выполнения работ по судоподъёму?",
    answer: "Сроки зависят от сложности проекта: глубины залегания, размера судна, гидрологических условий. Типовой проект занимает от 2 до 8 недель. Аварийные работы выполняются в режиме 24/7 с минимальными сроками мобилизации. Точные сроки определяются после первичного обследования объекта.",
  },
  {
    question: "Как организована работа по Приказу Минтранса №176?",
    answer: "Приказ №176 устанавливает порядок подъёма затонувшего имущества на ВВП РФ. Мы разрабатываем проект подъёма в полном соответствии с требованиями приказа, включая: обоснование метода подъёма, расчёты, план мероприятий по охране окружающей среды, согласования с уполномоченными органами.",
  },
  {
    question: "Какие согласования и разрешения необходимы?",
    answer: "Для проведения судоподъёмных работ требуются согласования: Росморречфлот, МЧС России, Росприроднадзор, администрация порта или бассейнового органа управления. Мы берём на себя полное сопровождение всех согласований и получение разрешительной документации.",
  },
  {
    question: "Можете ли вы работать в портах?",
    answer: "Да, мы имеем опыт работы в морских и речных портах Дальнего Востока. Все работы координируются с портовыми администрациями с соблюдением требований безопасности судоходства. Выполняем работы с минимальным влиянием на портовые операции.",
  },
  {
    question: "Из чего складывается стоимость работ?",
    answer: "Стоимость формируется на основе: глубины и удалённости объекта, размера и массы судна, сложности технических решений, объёма проектной документации, необходимости согласований. После первичного обследования готовим детальную смету с расшифровкой всех работ.",
  },
  {
    question: "Какие документы мы получим по итогам работ?",
    answer: "По завершении работ вы получаете: проект подъёма судна, ППР, технический отчёт, акты водолазного обследования, фото- и видеоотчёт, акт приёмки выполненных работ. Все документы оформляются в соответствии с требованиями надзорных органов и страховых компаний.",
  },
  {
    question: "Работаете ли вы с аварийными случаями?",
    answer: "Да, мы оказываем услуги по аварийному судоподъёму с выездом в течение 24 часов. Имеем опыт работы в сложных условиях: сильное течение, ограниченная видимость, неблагоприятные погодные условия. Круглосуточная диспетчерская служба.",
  },
  {
    question: "Какая техника используется?",
    answer: "Применяем современное оборудование: плавучие краны различной грузоподъёмности, понтоны, водолазные комплексы, гидроакустические приборы для обследования. Техника подбирается под конкретный проект для обеспечения оптимального соотношения эффективности и стоимости.",
  },
];

const FAQ = () => {
  const faqSchemaItems = faqItems.map(item => ({
    question: item.question,
    answer: item.answer
  }));

  return (
    <Layout>
      <SEOHead
        title="FAQ — Вопросы о судоподъёме и документации"
        description="Ответы на часто задаваемые вопросы о судоподъёме, Приказе Минтранса №176, согласованиях, сроках и стоимости работ."
        keywords="вопросы судоподъём, FAQ водолазные работы, Приказ 176 вопросы, стоимость судоподъёма"
        canonical="/faq"
      />
      <FAQSchema items={faqSchemaItems} />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="FAQ"
              title="Часто задаваемые вопросы"
              description="Ответы на основные вопросы о судоподъёме, документации и организации работ"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding pt-0">
        <div className="container-custom max-w-3xl">
          <StaggerContainer staggerDelay={0.08}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <StaggerItem key={index}>
                  <AccordionItem 
                    value={`item-${index}`}
                    className="card-ocean px-6 border-border data-[state=open]:border-primary/50"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-primary py-6">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </StaggerItem>
              ))}
            </Accordion>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Не нашли ответ на свой вопрос?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами — мы ответим на все ваши вопросы и поможем разобраться в деталях
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Задать вопрос
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
