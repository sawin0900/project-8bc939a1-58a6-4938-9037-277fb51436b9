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
import salvageImg from "@/assets/images/salvage-crane-operation.jpg";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";

type FaqItem = { question: string; answer: string };
type FaqContent = {
  seo: { title: string; description: string; keywords: string };
  hero: { title: string; description: string };
  imageAlt: string;
  cta: { title: string; description: string; button: string };
  items: FaqItem[];
};

const faqByLanguage: Record<Language, FaqContent> = {
  ru: {
    seo: {
      title: "FAQ — Вопросы о судоподъёме и документации",
      description: "Ответы на часто задаваемые вопросы о судоподъёме, Приказе Минтранса №176, согласованиях, сроках и стоимости работ.",
      keywords: "вопросы судоподъём, FAQ водолазные работы, Приказ 176 вопросы, стоимость судоподъёма",
    },
    hero: {
      title: "Часто задаваемые вопросы",
      description: "Ответы на основные вопросы о судоподъёме, документации и организации работ",
    },
    imageAlt: "Судоподъёмные работы",
    cta: {
      title: "Не нашли ответ на свой вопрос?",
      description: "Свяжитесь с нами — мы ответим на все ваши вопросы и поможем разобраться в деталях",
      button: "Задать вопрос",
    },
    items: [
      { question: "Каковы сроки выполнения работ по судоподъёму?", answer: "Сроки зависят от сложности проекта: глубины залегания, размера судна, гидрологических условий. Типовой проект занимает от 2 до 8 недель. Аварийные работы выполняются в режиме 24/7 с минимальными сроками мобилизации. Точные сроки определяются после первичного обследования объекта." },
      { question: "Как организована работа по Приказу Минтранса №176?", answer: "Приказ №176 устанавливает порядок подъёма затонувшего имущества на ВВП РФ. Мы разрабатываем проект подъёма в полном соответствии с требованиями приказа, включая: обоснование метода подъёма, расчёты, план мероприятий по охране окружающей среды, согласования с уполномоченными органами." },
      { question: "Какие согласования и разрешения необходимы?", answer: "Для проведения судоподъёмных работ требуются согласования: Росморречфлот, МЧС России, Росприроднадзор, администрация порта или бассейнового органа управления. Мы берём на себя полное сопровождение всех согласований и получение разрешительной документации." },
      { question: "Можете ли вы работать в портах?", answer: "Да, мы имеем опыт работы в морских и речных портах Дальнего Востока. Все работы координируются с портовыми администрациями с соблюдением требований безопасности судоходства. Выполняем работы с минимальным влиянием на портовые операции." },
      { question: "Из чего складывается стоимость работ?", answer: "Стоимость формируется на основе: глубины и удалённости объекта, размера и массы судна, сложности технических решений, объёма проектной документации, необходимости согласований. После первичного обследования готовим детальную смету с расшифровкой всех работ." },
      { question: "Какие документы мы получим по итогам работ?", answer: "По завершении работ вы получаете: проект подъёма судна, ППР, технический отчёт, акты водолазного обследования, фото- и видеоотчёт, акт приёмки выполненных работ. Все документы оформляются в соответствии с требованиями надзорных органов и страховых компаний." },
      { question: "Работаете ли вы с аварийными случаями?", answer: "Да, мы оказываем услуги по аварийному судоподъёму с выездом в течение 24 часов. Имеем опыт работы в сложных условиях: сильное течение, ограниченная видимость, неблагоприятные погодные условия. Круглосуточная диспетчерская служба." },
      { question: "Какая техника используется?", answer: "Применяем современное оборудование: плавучие краны различной грузоподъёмности, понтоны, водолазные комплексы, гидроакустические приборы для обследования. Техника подбирается под конкретный проект для обеспечения оптимального соотношения эффективности и стоимости." },
    ],
  },
  en: {
    seo: {
      title: "FAQ — Questions about ship recovery and documentation",
      description: "Answers to common questions about ship recovery, Ministry Order No.176, approvals, timelines, and costs.",
      keywords: "ship recovery FAQ, diving operations FAQ, order 176, ship lifting cost",
    },
    hero: {
      title: "Frequently asked questions",
      description: "Answers to key questions about ship recovery, documentation, and workflow organization",
    },
    imageAlt: "Ship recovery operations",
    cta: {
      title: "Didn’t find your answer?",
      description: "Contact us — we will answer your questions and help clarify project details",
      button: "Ask a question",
    },
    items: [
      { question: "How long does ship recovery take?", answer: "Timing depends on depth, vessel size, and hydro conditions. A typical project takes 2 to 8 weeks. Emergency operations are performed 24/7 with rapid mobilization." },
      { question: "How do you work under Ministry Order No.176?", answer: "Order No.176 regulates lifting of sunken property on inland waterways. We prepare full project documentation compliant with all requirements, including method rationale, calculations, environmental measures, and approvals." },
      { question: "What approvals are required?", answer: "Approvals typically involve maritime authorities, emergency services, environmental regulators, and port administration. We manage the full approval process and permitting package." },
      { question: "Can you operate in ports?", answer: "Yes. We have practical experience in marine and river ports. Operations are coordinated with port authorities and carried out with minimal impact on port activity." },
      { question: "How is project cost formed?", answer: "Cost depends on depth and remoteness, vessel size and mass, engineering complexity, documentation volume, and approval requirements. After initial survey we prepare a detailed estimate." },
      { question: "What documents do we receive at completion?", answer: "You receive the lifting project, method statement, technical report, diving inspection records, photo/video report, and acceptance documents." },
      { question: "Do you handle emergency cases?", answer: "Yes, with deployment within 24 hours. We operate in difficult conditions including strong currents and limited visibility, with 24/7 dispatch support." },
      { question: "What equipment do you use?", answer: "We use floating cranes, pontoons, diving systems, and hydroacoustic inspection tools. Equipment selection is tailored to each project." },
    ],
  },
  zh: {
    seo: {
      title: "FAQ——关于打捞与文件的问题",
      description: "关于船舶打捞、第176号命令、审批流程、工期与费用的常见问题解答。",
      keywords: "打捞FAQ, 潜水作业FAQ, 176号命令, 打捞费用",
    },
    hero: {
      title: "常见问题",
      description: "关于打捞、项目文件和作业组织的核心问题解答",
    },
    imageAlt: "船舶打捞作业",
    cta: {
      title: "没有找到答案？",
      description: "联系我们，我们将为您详细解答并帮助明确项目细节",
      button: "提出问题",
    },
    items: [
      { question: "打捞作业周期一般多久？", answer: "周期取决于深度、船体规模和水文条件。常规项目通常为2至8周，应急项目可24/7快速动员执行。" },
      { question: "如何按照176号命令开展工作？", answer: "176号命令规范了内河沉没财产打捞流程。我们提供完整合规方案，包括方法论证、计算、环保措施和审批支持。" },
      { question: "需要哪些审批和许可？", answer: "通常需要与相关主管机构和港口管理方协调。我们可负责全流程审批与许可文件准备。" },
      { question: "可以在港口作业吗？", answer: "可以。我们具备海港和河港作业经验，严格与港口管理方协调并尽量减少对运营影响。" },
      { question: "费用由哪些因素构成？", answer: "费用取决于目标深度与距离、船舶尺寸与重量、技术复杂度、文件量及审批要求。勘察后提供详细报价。" },
      { question: "项目完成后会提供哪些文件？", answer: "交付内容包括打捞方案、施工组织文件、技术报告、潜水记录、影像资料和验收文件。" },
      { question: "是否承接应急案例？", answer: "是的，可在24小时内出动，支持复杂工况并提供全天候调度支持。" },
      { question: "使用哪些设备？", answer: "使用浮吊、浮筒、潜水系统及水声探测设备，并按项目特点进行配置。" },
    ],
  },
};

const FAQ = () => {
  const { language } = useI18n();
  const content = faqByLanguage[language];
  const faqItems = content.items;
  const faqSchemaItems = faqItems.map(item => ({
    question: item.question,
    answer: item.answer
  }));

  return (
    <Layout pageClass="page-faq">
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
        keywords={content.seo.keywords}
        canonical="/faq"
      />
      <FAQSchema items={faqSchemaItems} />

      {/* Hero */}
      <section className="section-padding pt-32 pb-6 md:pb-10 hero relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge="FAQ"
              headingLevel="h1"
              title={content.hero.title}
              description={content.hero.description}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Image */}
      <section className="section-padding pb-0 pt-6 md:pt-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={salvageImg} alt={content.imageAlt} className="w-full rounded-2xl shadow-lg max-h-[350px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding pt-8">
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
              {content.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                {content.cta.button}
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
