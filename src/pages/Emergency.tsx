import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { motion } from "framer-motion";
import { AlertTriangle, Clock, Shield, Phone, Send, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Срочный выезд специалистов",
    description: "Оперативная мобилизация бригады и техники в кратчайшие сроки. Готовность к выезду — 24 часа в сутки, 7 дней в неделю.",
  },
  {
    icon: AlertTriangle,
    title: "Работы в сложных условиях",
    description: "Выполнение работ в сложных гидрологических условиях: сильное течение, ограниченная видимость, низкие температуры.",
  },
  {
    icon: Shield,
    title: "Минимизация рисков",
    description: "Комплекс мер по предотвращению экологического ущерба и обеспечению безопасности судоходства в акватории.",
  },
];

const Emergency = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32 bg-destructive/5">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-accent" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
            >
              Экстренные случаи
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            >
              Аварийные и срочные работы
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Оперативное реагирование на аварийные ситуации. 
              Минимизация ущерба и восстановление судоходства в кратчайшие сроки.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <a href="tel:+79991234567">
                  <Phone className="w-5 h-5 mr-2" />
                  Экстренный вызов
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://t.me/morproekt" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Написать в Telegram
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="card-ocean p-8 text-center h-full">
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-ocean-dark">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeader
              title="Как мы реагируем на аварии"
              description="Отработанный алгоритм действий обеспечивает максимальную скорость реагирования"
            />
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Приём заявки", desc: "Круглосуточная диспетчерская служба" },
              { step: "2", title: "Оценка ситуации", desc: "Удалённый анализ и планирование" },
              { step: "3", title: "Мобилизация", desc: "Выезд бригады с необходимым оборудованием" },
              { step: "4", title: "Выполнение работ", desc: "Ликвидация последствий аварии" },
            ].map((item, index) => (
              <StaggerItem key={index}>
                <div className="relative">
                  <div className="card-ocean p-6 h-full">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold mb-4">
                      {item.step}
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection animation="scale">
            <div className="card-ocean p-8 md:p-12 border-accent/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Нужна срочная помощь?
                  </h2>
                  <p className="text-muted-foreground">
                    Свяжитесь с нами любым удобным способом — мы готовы выехать немедленно
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <a href="tel:+79991234567">
                      <Phone className="w-5 h-5 mr-2" />
                      +7 (999) 123-45-67
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="https://t.me/morproekt" target="_blank" rel="noopener noreferrer">
                      <Send className="w-5 h-5 mr-2" />
                      Telegram
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Emergency;
