"use client"

import {FunctionComponent, useState} from "react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {BranchSchema, CampaignSchema} from "@/types/schema";
import {BranchType, CampaignType} from "@/types/types";
import {Input} from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Combobox, {ItemCombobox} from "@/components/combobox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Building, Target, Save, Calendar, Users, ChevronDown, ChevronUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FormBranchesProps {
    handleSubmit: (values: BranchType) => Promise<void>
    handleCampaignSubmit: (values: CampaignType) => Promise<void>
    commercial_distributors: ItemCombobox[]
    instance?: BranchType;
    search_commercial_distributors: string;
    setSearchCommercialDistributors: (value: string) => void;
    branches?: ItemCombobox[]
    search_branches?: string
    setSearchBranches?: (value: string) => void
    isLoading?: boolean;
    isSubmittingCampaign?: boolean;
}

const FormBranches: FunctionComponent<FormBranchesProps> = ({
                                                                handleSubmit,
                                                                handleCampaignSubmit,
                                                                commercial_distributors,
                                                                setSearchCommercialDistributors,
                                                                search_commercial_distributors,
                                                                branches = [],
                                                                search_branches = "",
                                                                setSearchBranches = () => {},
                                                                isLoading = false,
                                                                isSubmittingCampaign = false
                                                            }) => {
    const [isBranchFormOpen, setIsBranchFormOpen] = useState(true);
    const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);

    // Formulario para Branch
    const branchForm = useForm<BranchType>({
        resolver: zodResolver(BranchSchema),
        defaultValues: {
            name: "",
            commercial_distributor_id: ""
        },
    });

    // Formulario para Campaign
    const campaignForm = useForm<CampaignType>({
        resolver: zodResolver(CampaignSchema),
        defaultValues: {
            user_amount: 0,
            commercial_distributor_id: "",
            branch_id: ""
        },
    });

    return (
        <div className="w-full mx-auto space-y-2 min-h-screen">
            <Card className="w-full overflow-hidden border shadow-sm">
                <CardHeader className="pb-4 border-b">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-md bg-blue-100">
                                <Building className="h-5 w-5 text-blue-700" />
                            </div>
                            <div>
                                <CardTitle className="text-xl">Panel de Administración</CardTitle>
                                <CardDescription>
                                    Gestión integral de sucursales y campañas corporativas
                                </CardDescription>
                            </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            v2.1.0
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                    {/* Formulario para Branch */}
                    <Collapsible
                        open={isBranchFormOpen}
                        onOpenChange={setIsBranchFormOpen}
                        className="rounded-md border border-gray-250 p-5 shadow-xs"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md">
                                    <Building className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Registro de Sucursal</h3>
                                    <p className="text-sm">
                                        Complete los datos requeridos para el registro de nueva sucursal
                                    </p>
                                </div>
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                    {isBranchFormOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent className="pt-6 space-y-6">
                            <Alert className={"bg-green-500/10 border-green-700"}>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                    Todos los campos marcados como requeridos deben ser completados para proceder con el registro.
                                </AlertDescription>
                            </Alert>

                            <Form {...branchForm}>
                                <form onSubmit={branchForm.handleSubmit(handleSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <FormField
                                            control={branchForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 font-medium">
                                                        <span>Denominación de Sucursal</span>
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-400">Requerido</Badge>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Ingrese la denominación comercial"
                                                            {...field}
                                                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-500 text-xs">
                                                        Designación oficial que identificará la sucursal en todos los sistemas corporativos.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={branchForm.control}
                                            name="commercial_distributor_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                                                        <span>Distribuidor Comercial Asociado</span>
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-400">Requerido</Badge>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Combobox
                                                            data={commercial_distributors}
                                                            setData={field.onChange}
                                                            data_selected={field.value}
                                                            search={search_commercial_distributors}
                                                            setSearch={setSearchCommercialDistributors}
                                                            placeholder="Seleccione un distribuidor comercial..."
                                                            className="border-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-500 text-xs">
                                                        Entidad distribuidora bajo cuya jurisdicción operará la sucursal.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator />

                                    <div className="flex gap-3 justify-end pt-2">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-md font-medium text-white shadow-xs border border-blue-800"
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            {isLoading ? "Procesando..." : "REGISTRAR SUCURSAL"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CollapsibleContent>
                    </Collapsible>

                    <Separator />

                    {/* Formulario para Campaign */}
                    <Collapsible
                        open={isCampaignFormOpen}
                        onOpenChange={setIsCampaignFormOpen}
                        className="rounded-md border border-gray-250 p-5 shadow-xs"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-md">
                                    <Target className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Configuración de Campaña</h3>
                                    <p className="text-sm">
                                        Defina los parámetros para la asignación de recursos en campaña
                                    </p>
                                </div>
                            </div>
                            <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-9 p-0">
                                    {isCampaignFormOpen ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">Toggle</span>
                                </Button>
                            </CollapsibleTrigger>
                        </div>

                        <CollapsibleContent className="pt-6 space-y-6">
                            <Alert className="bg-green-500/10 border-green-700">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription className="text-sm">
                                    Configure los parámetros de asignación para la campaña operativa. Todos los campos son obligatorios.
                                </AlertDescription>
                            </Alert>

                            <Form {...campaignForm}>
                                <form onSubmit={campaignForm.handleSubmit(handleCampaignSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={campaignForm.control}
                                            name="user_amount"
                                            render={({ field }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                                                        <span>Cupo de Usuarios</span>
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-400">Requerido</Badge>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            placeholder="Especifique la cantidad"
                                                            {...field}
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(parseInt(e.target.value ?? 0) ?? 0)}
                                                            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-500 text-xs">
                                                        Número máximo de usuarios asignables para esta campaña.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={campaignForm.control}
                                            name="commercial_distributor_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                                                        <span>Entidad Distribuidora</span>
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-400">Requerido</Badge>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Combobox
                                                            data={commercial_distributors}
                                                            setData={field.onChange}
                                                            data_selected={field.value}
                                                            search={search_commercial_distributors}
                                                            setSearch={setSearchCommercialDistributors}
                                                            placeholder="Seleccione distribuidor..."
                                                            className="border-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-500 text-xs">
                                                        Distribuidor comercial responsable de la campaña.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={campaignForm.control}
                                            name="branch_id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2 text-gray-700 font-medium">
                                                        <span>Sucursal Destino</span>
                                                        <Badge variant="outline" className="text-xs bg-red-500/10 border-red-400">Requerido</Badge>
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Combobox
                                                            data={branches}
                                                            setData={field.onChange}
                                                            data_selected={field.value}
                                                            search={search_branches}
                                                            setSearch={setSearchBranches}
                                                            placeholder="Seleccione sucursal..."
                                                            className="border-gray-300"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-500 text-xs">
                                                        Sucursal donde se ejecutará la campaña.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator className="bg-gray-200" />

                                    <div className="flex gap-3 justify-end pt-2">
                                        <Button
                                            type="submit"
                                            disabled={isSubmittingCampaign}
                                            className="bg-green-700 hover:bg-green-800 px-5 py-2.5 rounded-md font-medium text-white shadow-xs border border-green-800"
                                        >
                                            <Target className="h-4 w-4 mr-2" />
                                            {isSubmittingCampaign ? "Configurando..." : "EJECUTAR CAMPAÑA"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>
            <div className="text-center text-xs text-gray-500 pt-2">
                <p>© 2024 Sistema Corporativo de Gestión. Todos los derechos reservados.</p>
                <p className="mt-1">Para asistencia técnica, contactar al departamento de Sistemas: ext. 4357</p>
            </div>
        </div>
    )
}

export default FormBranches;