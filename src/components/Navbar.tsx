"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, logout } from "@/features/auth/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  
  
  const { isLoggedIn, userName } = useSelector((state: any) => state.auth);
  
  
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 shadow">
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl">QuickShop</span>
      </div>

     
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Button onClick={() => alert("Login clicked")}>Login</Button>
            <Button onClick={() => alert("Register clicked")}>Register</Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>{userName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => dispatch(toggleDarkMode())}
              >
                Dark Mode
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => alert("Settings clicked")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => dispatch(logout())}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
