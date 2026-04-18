import { Layout } from "@/components/layout/Layout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineStep } from "@/components/ui/TimelineStep";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { SEOHead, Breadcrumbs } from "@/components/seo";
import { ArrowRight } from "lucide-react";
import divingTeamImg from "@/assets/images/diving-team-equipment.jpg";
import pontoonImg from "@/assets/images/pontoon-salvage.jpg";
import { useI18n } from "@/i18n";
import type { Language } from "@/i18n/types";

type Stage = { title: string; description: string };
type WorkStagesContent = {
  seo: { title: string; description: string; keywords: string };
  hero: { badge: string; title: string; description: string };
  stages: Stage[];
  imageAltPrimary: string;
  imageAltSecondary: string;
  cta: { title: string; description: string; button: string };
};

const contentByLanguage: Record<Language, WorkStagesContent> = {
  ru: {
    seo: {
      title: "Этапы судоподъёмных работ — от обследования до сдачи",
      description: "Пошаговый процесс выполнения судоподъёма: сбор данных, водолазное обследование, инженерные расчёты, проектная документация, согласования и подъём судна.",
      keywords: "этапы судоподъёма, процесс подъёма судна, водолазное обследование, проект подъёма судна, согласования судоподъёма",
    },
    hero: {
      badge: "Этапы работ",
      title: "Пошаговый процесс выполнения работ",
      description: "Системный подход к каждому проекту — от первичного анализа до сдачи готовой документации",
    },
    stages: [
      { title: "Сбор и анализ исходных данных", description: "Изучение архивных материалов, определение координат объекта, анализ гидрологических условий, оценка глубины и характера дна. Сбор информации о судне: размеры, тоннаж, характер груза, причины затопления." },
      { title: "Водолазное обследование объекта", description: "Детальное обследование затонувшего судна водолазами с фото- и видеофиксацией. Определение положения объекта, степени разрушения, наличия опасных веществ. Составление дефектовочной ведомости и акта обследования." },
      { title: "Инженерные расчёты и технические решения", description: "Расчёт водоизмещения, определение центра тяжести, выбор метода подъёма. Расчёт необходимой грузоподъёмности, подбор оборудования и плавсредств. Разработка технических решений с учётом особенностей объекта." },
      { title: "Разработка проектной документации", description: "Подготовка проекта подъёма судна, плана производства работ (ППР), технического отчёта. Разработка экологической документации и оценки воздействия на окружающую среду. Формирование комплекта документов для согласования." },
      { title: "Получение согласований и допусков", description: "Согласование проекта в Росморречфлоте, МЧС, Росприроднадзоре, администрации порта. Получение разрешений на проведение работ в акватории. Оформление допусков и уведомлений для всех участников работ." },
      { title: "Выполнение судоподъёмных работ", description: "Мобилизация техники и персонала. Подготовительные работы: установка понтонов, крепление строп. Непосредственный подъём с соблюдением всех мер безопасности. Транспортировка к месту разделки или отстоя." },
      { title: "Утилизация и вывоз", description: "Разделка корпуса судна на металлолом в соответствии с требованиями экологического законодательства. Вывоз и утилизация опасных отходов. Очистка акватории от загрязнений." },
      { title: "Подготовка и сдача отчётной документации", description: "Формирование полного комплекта отчётной документации: акты выполненных работ, технический отчёт, фото- и видеоматериалы. Передача документов заказчику и в надзорные органы. Получение акта приёмки работ." },
    ],
    imageAltPrimary: "Водолазная бригада готовится к работе",
    imageAltSecondary: "Понтонный метод подъёма",
    cta: {
      title: "Готовы начать проект?",
      description: "Оставьте заявку — мы свяжемся с вами для обсуждения деталей и подготовки коммерческого предложения",
      button: "Оставить заявку",
    },
  },
  en: {
    seo: {
      title: "Ship recovery stages — from survey to completion",
      description: "Step-by-step ship recovery process: data collection, diving survey, engineering calculations, project documentation, approvals, and lifting.",
      keywords: "ship recovery stages, vessel lifting process, diving survey, recovery project documentation, approvals",
    },
    hero: {
      badge: "Work stages",
      title: "Step-by-step execution process",
      description: "A systematic approach to every project — from initial analysis to final documentation handover",
    },
    stages: [
      { title: "Initial data collection and analysis", description: "Archive review, object coordinates, hydro conditions, depth, and seabed type assessment. Vessel data collection: dimensions, tonnage, cargo, and sinking causes." },
      { title: "Diving inspection of the object", description: "Detailed diver inspection with photo and video recording. Position, structural condition, and hazardous substances assessment. Defect report and inspection statement preparation." },
      { title: "Engineering calculations and technical solutions", description: "Displacement calculations, center of gravity definition, and lifting method selection. Capacity calculations, equipment and support vessel selection." },
      { title: "Project documentation development", description: "Preparation of lifting project, method statement, and technical report. Environmental documentation and impact assessment. Full approval package preparation." },
      { title: "Approvals and permits", description: "Coordination with authorities and port administration. Water-area permits and mandatory notifications for all participants." },
      { title: "Execution of lifting operations", description: "Mobilization of equipment and crew. Preparatory work: pontoon setup and rigging. Controlled lifting and transfer to dismantling or storage area." },
      { title: "Disposal and removal", description: "Hull dismantling in compliance with environmental regulations. Hazardous waste handling and water-area cleanup." },
      { title: "Final reporting and handover", description: "Preparation of final documentation package: acts, technical report, and media records. Submission to customer and authorities." },
    ],
    imageAltPrimary: "Diving crew preparing for operations",
    imageAltSecondary: "Pontoon lifting method",
    cta: {
      title: "Ready to start your project?",
      description: "Leave a request — we will contact you to discuss details and prepare a commercial proposal",
      button: "Request a quote",
    },
  },
  zh: {
    seo: {
      title: "打捞作业阶段——从勘察到交付",
      description: "船舶打捞的完整流程：数据收集、潜水勘察、工程计算、项目文件、审批与打捞实施。",
      keywords: "船舶打捞阶段, 打捞流程, 潜水勘察, 项目文件, 审批",
    },
    hero: {
      badge: "作业阶段",
      title: "分步骤执行流程",
      description: "每个项目采用系统化方法——从初步分析到最终文件交付",
    },
    stages: [
      { title: "初始数据收集与分析", description: "研究档案资料、确定目标坐标、分析水文条件、评估深度与底质，并收集船舶尺寸、吨位、载荷和沉没原因。" },
      { title: "潜水勘察", description: "潜水员进行详细勘察并拍摄影像，确定目标位置、损坏程度和潜在危险物质，形成勘察报告。" },
      { title: "工程计算与技术方案", description: "计算排水量与重心，选择打捞方法，确定所需起重能力并配置设备和辅助船只。" },
      { title: "项目文件编制", description: "编制打捞项目文件、施工组织方案和技术报告，同时准备环境影响与审批文件。" },
      { title: "审批与许可", description: "与主管机构和港口管理方协调，获取在作业水域施工所需许可并完成通知手续。" },
      { title: "实施打捞作业", description: "组织设备与人员进场，完成浮筒安装和吊装准备，按安全要求实施打捞并转运。" },
      { title: "拆解与清运", description: "按环保法规进行船体拆解、危险废弃物处理及作业水域清理。" },
      { title: "报告与交付", description: "形成完整交付文件（作业记录、技术报告、影像资料），提交客户和监管机构。" },
    ],
    imageAltPrimary: "潜水团队准备作业",
    imageAltSecondary: "浮筒打捞方式",
    cta: {
      title: "准备开始项目了吗？",
      description: "提交申请后，我们会联系您确认细节并提供商务方案",
      button: "提交申请",
    },
  },
};

const WorkStages = () => {
  const { language } = useI18n();
  const content = contentByLanguage[language];

  return (
    <Layout pageClass="page-etapy">
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
        keywords={content.seo.keywords}
        canonical="/stages"
      />

      {/* Hero */}
      <section className="section-padding pt-32 pb-6 md:pb-10 hero hero-compact relative overflow-hidden">
        <div className="container-custom">
          <Breadcrumbs />
          <AnimatedSection>
            <SectionHeader
              badge={content.hero.badge}
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
            <img src={divingTeamImg} alt={content.imageAltPrimary} className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding pt-8">
        <div className="container-custom max-w-3xl">
          <StaggerContainer staggerDelay={0.15}>
            {content.stages.map((stage, index) => (
              <StaggerItem key={index}>
                <TimelineStep
                  number={index + 1}
                  title={stage.title}
                  description={stage.description}
                  isLast={index === content.stages.length - 1}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Image 2 */}
      <section className="py-8">
        <div className="container-custom">
          <AnimatedSection>
            <img src={pontoonImg} alt={content.imageAltSecondary} className="w-full rounded-2xl shadow-lg max-h-[400px] object-cover" />
          </AnimatedSection>
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

export default WorkStages;
