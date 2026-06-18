import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { login, register } from "@/lib/mockStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { BricklyLogo } from "@/components/BricklyLogo";
const Auth = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [selectedRole, setSelectedRole] = useState("BUYER");
    const mode = searchParams.get("mode") || "signin";
    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(email, password);
            if (!user)
                throw new Error("Email not found. Try buyer@example.com");
            toast({ title: "Welcome back!", description: `Signed in as ${user.full_name}` });
            navigate("/profile");
        }
        catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
        finally {
            setLoading(false);
        }
    };
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await register(email, fullName, selectedRole, password);
            toast({ title: "Account created!", description: `Welcome to Brickly, ${user.full_name}!` });
            navigate("/profile");
        }
        catch (error) {
            toast({ variant: "destructive", title: "Error", description: error.message });
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center p-2 rounded-full hover:bg-accent/10 transition">
            <BricklyLogo size={40} />
          </Link>
        </div>

        <div className="mb-4 p-3 bg-accent/10 rounded-lg text-sm text-center text-muted-foreground">
          Demo accounts:
          <strong>buyer@example.com</strong> |
          <strong>seller@example.com</strong> |
          <strong>moadmin@gmail.com</strong>
        </div>

        <Tabs defaultValue={mode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Sign in to your Brickly account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Use password123" value={password} onChange={e => setPassword(e.target.value)} required/>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-accent to-accent/90" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Join Brickly to find your dream home</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input id="fullname" type="text" placeholder="Your Name" value={fullName} onChange={e => setFullName(e.target.value)} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Choose a password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6}/>
                  </div>
                  <div className="space-y-2">
                    <Label>I want to</Label>
                    <RadioGroup value={selectedRole} onValueChange={v => setSelectedRole(v)}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="BUYER" id="BUYER"/>
                        <Label htmlFor="BUYER" className="font-normal cursor-pointer">Find a property (BUYER)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="SELLER" id="SELLER"/>
                        <Label htmlFor="SELLER" className="font-normal cursor-pointer">List my property (SELLER)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-accent to-accent/90" disabled={loading}>
                    {loading ? "Creating account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>);
};
export default Auth;
