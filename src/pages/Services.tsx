import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { 
  Ship, 
  Anchor, 
  FileText, 
  Users, 
  AlertTriangle,
  ClipboardList,
  Waves,
  Search,
  ArrowRight,
  Scissors,
  Flame
} from "lucide-react";

const services = [
  {
    icon: Ship,
    title: "Судоподъём затонувших судов",
    description: "Полный комплекс работ по подъёму затонувших судов различного тоннажа. Разработка проекта, получение разрешений, выполнение работ с привлечением специализированной техники.",
  },
  {
    icon: AlertTriangle,
    title: "Аварийный и плановый судоподъём",
    description: "Оперативное реагирование на аварийные ситуации. Минимизация экологического ущерба и рисков для судоходства. Работа в сложных гидрологических условиях.",
  },
  {
    icon: Scissors,
    title: "Демонтаж затонувших объектов",
    description: "Демонтаж затонувших судов и металлоконструкций на месте с последующим подъёмом по частям. Работы в стеснённых условиях акваторий.",
  },
  {
    icon: Flame,
    title: "Подводная и надводная резка",
    description: "Резка металлоконструкций под водой и на поверхности. Кислородно-дуговая, плазменная и механическая резка. Работы любой сложности.",
  },
  {
    icon: Waves,
    title: "Водолазные обследования акваторий",
    description: "Комплексное обследование акваторий портов, судоходных каналов, причальных сооружений. Определение состояния дна и подводных объектов.",
  },
  {
    icon: Search,
    title: "Обследование затонувших объектов",
    description: "Детальное обследование затонувших судов и металлоконструкций. Оценка технического состояния, фото- и видеофиксация, составление дефектовочных ведомостей.",
  },
  {
    icon: FileText,
    title: "Проектная и рабочая документация",
    description: "Разработка проекта подъёма судна, плана производства работ (ППР), технических решений в соответствии с Приказом Минтранса РФ №176.",
  },
  {
    icon: ClipboardList,
    title: "Разрешительная документация",
    description: "Подготовка экологической документации, получение разрешений на проведение работ, согласование с надзорными органами.",
  },
  {
    icon: Users,
    title: "Сопровождение согласований",
    description: "Полное сопровождение согласований в Росморречфлоте, МЧС, Росприроднадзоре, капитаниях портов и других органах.",
  },
  {
    icon: Anchor,
    title: "Работы по федеральным программам",
    description: "Выполнение работ в рамках федеральных и муниципальных программ по очистке акваторий и обеспечению безопасности судоходства.",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              badge="Услуги"
              title="Полный спектр услуг по судоподъёму, демонтажу и резке"
              description="Профессиональное выполнение работ в соответствии с требованиями законодательства РФ и надзорных органов"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <StaggerItem key={index}>
                <ServiceCard {...service} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom text-center">
          <AnimatedSection animation="scale">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Нужна помощь с выбором услуги?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами — мы проконсультируем по всем вопросам и поможем определить оптимальное решение для вашей задачи
            </p>
            <Button size="lg" className="btn-glow" asChild>
              <Link to="/contacts">
                Получить консультацию
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
