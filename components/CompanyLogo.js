import Image from "next/image";

/**
 * A flexible company logo component that can display:
 * 1. Local images from public/logos/companies directory
 * 2. Remote images from configured domains
 * 3. Text fallback when images are not available
 */
const CompanyLogo = ({
  name,
  logoSrc,
  width = 100,
  height = 40,
  className = "",
}) => {
  // Format company name for text display
  const formattedName = name || "Company";
  
  // If logo source is provided, render image
  if (logoSrc) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <Image
          src={logoSrc}
          alt={`${formattedName} logo`}
          width={width}
          height={height}
          className="object-contain"
        />
      </div>
    );
  }
  
  // Otherwise, render text-based logo
  return (
    <div className={`flex items-center justify-center bg-primary/10 rounded-md px-3 py-2 ${className}`}>
      <span className="font-bold text-primary text-sm">{formattedName}</span>
    </div>
  );
};

export default CompanyLogo; 