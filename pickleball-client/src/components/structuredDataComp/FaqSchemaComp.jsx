import { FAQPageJsonLd } from "next-seo";
import homeFaq from "@/data/faqs/homeFaqs.json";

const FaqSchemaComp = ({ faqData }) => {
    const faqNextSeoFormat = (faqData ? faqData : homeFaq).map(faq => ({
        questionName: faq.question,
        acceptedAnswerText: faq.answer
    }));
    return (
        <FAQPageJsonLd
            useAppDir={true}
            mainEntity={faqNextSeoFormat}
        />
    );
};

export default FaqSchemaComp;