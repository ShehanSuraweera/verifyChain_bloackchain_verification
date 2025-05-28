import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";
import { Clock } from "lucide-react";
import { CardanoWallet, useWallet } from "@meshsdk/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action: () => void;
  buttonText: string;
  implemented: boolean;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  action,
  buttonText,
  implemented,
}: FeatureCardProps) => {
  const { connected } = useWallet(); // Get wallet connection status
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100 bg-white/80 backdrop-blur-sm relative">
      {/* Coming Soon Badge */}
      {!implemented && (
        <Badge
          variant="secondary"
          className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        >
          <Clock className="h-3 w-3 mr-1" />
          Coming Soon
        </Badge>
      )}

      {!connected && title === "Upload & Issue" && (
        <Badge
          variant="secondary"
          className="absolute top-4 right-4  text-red-800 "
        >
          <CardanoWallet />
        </Badge>
      )}

      <CardHeader>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <Icon
            className={`h-6 w-6 ${
              implemented ? "text-blue-600" : "text-gray-400"
            }`}
          />
        </div>
        <CardTitle
          className={`text-xl ${
            implemented ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {title}
        </CardTitle>
        <CardDescription
          className={`${
            implemented ? "text-gray-600" : "text-gray-400"
          } leading-relaxed`}
        >
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={action}
                disabled={
                  !implemented || (!connected && title === "Upload & Issue")
                }
                className={`w-full transition-colors ${
                  implemented
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {buttonText}
              </Button>
            </TooltipTrigger>
            {!implemented && (
              <TooltipContent>
                <p className="text-sm">This feature is coming soon!</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
